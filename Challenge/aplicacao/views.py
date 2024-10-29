from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import Userserializers
from .serializers import LoginSerializer
from .serializers import serializers
from .serializers import serializersRecipe
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .models import Recipe
from django.db import models

class RegisterUserview(GenericAPIView):

    def post(self, request):
        serializer = Userserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = serializer.data

            return Response(
                {"data": user, "message": "User created "}, status=status.HTTP_200_OK
            )


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateRecipe(GenericAPIView):
    serializer_class = serializersRecipe

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            recipe = serializer.data
            return Response({"success": recipe}, status=status.HTTP_201_CREATED)

        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


class listAllRecipe(GenericAPIView):
    def get(self, request):
        recipe = Recipe.objects.all()
        serializer = serializersRecipe(recipe, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecipeDetailView(GenericAPIView):
    def get(self, request, pk):
        try:
            recipe = Recipe.objects.get(pk=pk)
            serializer = serializersRecipe(recipe)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):
        try:
            recipe = Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            return Response(
                {"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = serializersRecipe(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            recipe = Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
        
        recipe.delete()
        return Response({"message": "Recipe deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
   
class SearchRecipeView(GenericAPIView):
    def get(self, request):
        query = request.query_params.get("q", "")
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        recipes = Recipe.objects.filter(
            models.Q(name__icontains=query) |
            models.Q(ingredients__icontains=query) |
            models.Q(cuisine__icontains=query)
        )
        
        serializer = serializersRecipe(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FilterRecipesByIngredientsView(GenericAPIView):
    def get(self, request):
        ingredients = request.query_params.getlist("ingredients")
        if not ingredients:
            return Response({"error": "Ingredients parameter is required"}, status=status.HTTP_400_BAD_REQUEST)


        recipes = Recipe.objects.filter(
            models.Q(ingredients__icontains=ingredient) for ingredient in ingredients
        )
        
        serializer = serializersRecipe(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
