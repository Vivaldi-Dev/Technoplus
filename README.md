# URL Shortener API

Uma API REST para encurtamento de URLs, permitindo aos usuários criar links curtos personalizados ou aleatórios.

## Funcionalidades

- **Criação de URLs curtas:** Encurte URLs longas com um link curto aleatório ou personalizado.
- **Redirecionamento:** Redireciona automaticamente para a URL original ao acessar o link curto.


## Endpoints

### 1. Criar URL Curta

**Endpoint:** `/shorten`  
**Método:** `POST`  
**Body (JSON):**
- `originalUrl` (string): A URL longa que será encurtada.
- `customShortLink` (string, opcional): Um identificador personalizado para o link curto.

**Exemplo de Requisição:**
```json
POST /shorten
{
  "originalUrl": "https://www.example.com/very/long/url",
  "customShortLink": "meulink"
}

Exemplo de Resposta:
{
  "originalUrl": "https://www.example.com/very/long/url",
  "shortLink": "https://seuservidor.com/meulink"
}

2. Redirecionar para URL Original
Endpoint: /shorten/{shortLink}
Método: GET
Descrição: Redireciona o usuário para a URL original associada ao link curto fornecido.

Como Rodar o Projeto

1.Clone o repositório:
git clone https://github.com/usuario/urlshortener.git

# Instale as bibliotecas necessárias
pip install django djangorestframework django-cors-headers

2. Crie e ative um ambiente virtual
python3 -m venv venv
source venv/bin/activate  # No Windows, use venv\Scripts\activate

3. Execute as migrações do banco de dados:
python manage.py makemigrations
python manage.py migrate

4.Inicie o servidor:
python manage.py runserver
Acesse a API em http://127.0.0.1:8000/shorten.

Estrutura do Projeto
README.md: Documentação do projeto.
Tecnologias Utilizadas
Python
Django
Django REST Framework

