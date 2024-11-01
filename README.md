# Random API

Uma API REST simples para gerar números aleatórios dentro de um intervalo especificado.

## Funcionalidades

- Gera um número aleatório entre um valor mínimo e um valor máximo.
- Permite especificar os valores `min` e `max` através de parâmetros de consulta.

## Endpoints

### 1. Gerar Número Aleatório

**Endpoint:** `/random`  
**Método:** `GET`  
**Parâmetros de Consulta:**
- `min` (inteiro): O valor mínimo do intervalo (inclusivo).
- `max` (inteiro): O valor máximo do intervalo (inclusivo).

**Exemplo de Uso:**
```bash
GET /random?min=1&max=10

Exemplo de Resposta:

json
{
  "randomNumber": 7
}

Como Rodar o Projeto
1. Clone o repositório:
git clone https://github.com/Vivaldi-Dev/Technoplus/tree/main ou baixe



2. Navegue até o diretório do projeto:
cd randomapi

3.Crie um ambiente virtual e ative-o:
python3 -m venv venv
source venv/bin/activate  # No Windows, use venv\Scripts\activate

# Instale as bibliotecas necessárias
pip install django djangorestframework django-cors-headers

5. Execute as migrações do banco de dados:
python manage.py makemigrations 
python manage.py migrate

6.Inicie o servidor:
python manage.py runserver

7.Acesse a API em http://127.0.0.1:8000/random?min=1&max=10.

Tecnologias Utilizadas
Python
Django
Django REST Framework



