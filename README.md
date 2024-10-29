Projeto de API de Receitas
Esta API permite gerenciar usuários e receitas, com operações de criação, listagem, busca, edição e exclusão de receitas. Além disso, ela permite filtrar receitas por ingredientes e fazer buscas personalizadas.Django

Tecnologias
Django
Django REST Framework
Endpoints
Abaixo está uma descrição dos endpoints disponíveis na API.

1. Registro de Usuário
Rota: /register/
Método: POST
Descrição: Registra um novo usuário no sistema.
Body:
json

{
   "email": "admin@gmail.com",
    "first_name": "admin",
    "last_name": "admin",
    "password": "123456",
    "password2": "123456"
}
Resposta:
200 OK: Retorna os dados do usuário criado e uma mensagem de sucesso.
2. Login de Usuário
Rota: /login/
Método: POST
Descrição: Autentica um usuário e retorna um token de autenticação.
Body:
json

{
  "email": "nome_usuario",
  "password": "senha"
}
Resposta:
200 OK: Retorna o token de autenticação do usuário.
3. Criação de Receita
Rota: /createrecipe/
Método: POST
Descrição: Cria uma nova receita com os dados fornecidos.
Body:
json

{
  "name": "Nome da Receita",
  "ingredients": "Lista de ingredientes",
  "instructions": "Instruções de preparo",
  "cuisine": "Tipo de culinária"
}
Resposta:
201 CREATED: Retorna os dados da receita criada.
4. Listar Todas as Receitas
Rota: /recipe/
Método: GET
Descrição: Retorna uma lista de todas as receitas.
Resposta:
200 OK: Lista de todas as receitas no banco de dados.
5. Detalhes de uma Receita
Rota: /recipe/<int:pk>/
Método: GET
Descrição: Retorna os detalhes de uma receita específica com base em seu ID.
Parâmetro: pk - ID da receita.
Resposta:
200 OK: Dados da receita solicitada.
404 NOT FOUND: Receita não encontrada.
6. Atualizar uma Receita
Rota: /recipe/<int:pk>/
Método: PUT
Descrição: Atualiza os dados de uma receita específica.
Parâmetro: pk - ID da receita.
Body:
json

{
  "name": "Nome atualizado da receita",
  "ingredients": "Lista de ingredientes atualizada",
  "instructions": "Instruções atualizadas",
  "cuisine": "Tipo de culinária atualizado"
}
Resposta:
200 OK: Retorna os dados atualizados da receita.
404 NOT FOUND: Receita não encontrada.
7. Excluir uma Receita
Rota: /recipe/<int:pk>/
Método: DELETE
Descrição: Exclui uma receita com base em seu ID.
Parâmetro: pk - ID da receita.
Resposta:
204 NO CONTENT: Receita excluída com sucesso.
404 NOT FOUND: Receita não encontrada.
8. Buscar Receitas
Rota: /search-recipe/
Método: GET
Descrição: Busca receitas com base em um termo de pesquisa.
Parâmetro de Consulta: q - Termo de busca (nome, ingredientes ou tipo de culinária).
Exemplo de uso:
http://localhost:8000/search-recipe/?q=bolo
Resposta:
200 OK: Lista de receitas que contêm o termo de pesquisa.
9. Filtrar Receitas por Ingredientes
Rota: /filter-recipes-by-ingredients/
Método: GET
Descrição: Filtra receitas que contêm todos os ingredientes especificados.
Parâmetro de Consulta: ingredients - Lista de ingredientes (separados por vírgula).
Exemplo de uso:
http://localhost:8000/filter-recipes-by-ingredients/?ingredients=tomate,alho
Resposta:
200 OK: Lista de receitas que contêm todos os ingredientes especificados.
Executando o Projeto
Clone o repositório e instale as dependências.
Configure o ambiente virtual e ative-o.
Execute as migrações para criar o banco de dados:
bash

python manage.py migrate
Inicie o servidor de desenvolvimento:
bash

python manage.py runserver
