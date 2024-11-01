# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random

class RandomNumberAPIView(APIView):
    def get(self, request, *args, **kwargs):

        min_value = request.query_params.get('min')
        max_value = request.query_params.get('max')

        if min_value is None or max_value is None:
            return Response({"error": "Os parâmetros 'min' e 'max' são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            min_value = int(min_value)
            max_value = int(max_value)
        except ValueError:
            return Response({"error": "Os parâmetros 'min' e 'max' devem ser números inteiros."}, status=status.HTTP_400_BAD_REQUEST)

        if min_value > max_value:
            return Response({"error": "'min' deve ser menor ou igual a 'max'."}, status=status.HTTP_400_BAD_REQUEST)

        random_number = random.randint(min_value, max_value)
        return Response({"randomNumber": random_number})
