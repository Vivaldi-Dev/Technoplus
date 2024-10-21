BlogController
O BlogController é um componente fundamental da aplicação, responsável por gerenciar operações relacionadas a blogs e comentários. Ele expõe uma API RESTful que permite a criação, 
leitura, atualização e exclusão de blogs, bem como a adição de comentários a posts específicos. Abaixo estão os detalhes dos endpoints disponíveis:

Informações do Projeto
Tecnologia: O projeto foi desenvolvido utilizando o Spring Framework.
Banco de Dados: O banco de dados utilizado é o PostgreSQL. Certifique-se de configurar suas credenciais do PostgreSQL no arquivo de configuração da aplicação (application.properties ou application.yml), conforme necessário.

Autenticação
Todos os endpoints, exceto para o login e registro, requerem autenticação. Para acessar os recursos, é necessário realizar o login e incluir um token JWT no cabeçalho da requisição.

Endpoints de Autenticação
1. Registrar um Novo Usuário
Método: POST
Endpoint: http://localhost:8080/auth/register
Descrição: Registra um novo usuário na aplicação.
Requisição: Um objeto JSON no corpo da requisição, como mostrado abaixo:
{
    "login": "admin@mail.com",
    "name": "admin",
    "password": "123456",
    "role": "USER" or ADMIN
}

2. Login de Usuário
Método: POST
Endpoint: http://localhost:8080/auth/login
Descrição: Realiza o login de um usuário existente e retorna um token de autenticação.
Requisição: Um objeto JSON no corpo da requisição, como mostrado abaixo:
{
    "login": "admin@mail.com",
    "password": "123456"
}
Endpoints do Blog

1. Listar Todos os Blogs
Método: GET
Endpoint: /blog
Descrição: Retorna uma lista de todos os blogs disponíveis na aplicação.
Resposta: Uma lista de objetos BlogDto.

3. Criar um Novo Blog
Método: POST
Endpoint: /blog/create
Descrição: Cria um novo blog com os dados fornecidos.
Requisição: Um objeto BlogDto no corpo da requisição.
Resposta: O objeto BlogDto criado.

5. Buscar Blog por ID
Método: GET
Endpoint: /blog/{id}
Descrição: Retorna um blog específico com base no ID fornecido.
Parâmetros: id (Long) - O ID do blog a ser recuperado.
Resposta: O objeto BlogDto correspondente ao ID fornecido.

7. Atualizar Blog
Método: PUT
Endpoint: /blog/{id}
Descrição: Atualiza os dados de um blog existente com base no ID fornecido.
Parâmetros: id (Long) - O ID do blog a ser atualizado.
Requisição: Um objeto BlogDto no corpo da requisição.
Resposta: O objeto BlogDto atualizado.

9. Excluir Blog
Método: DELETE
Endpoint: /blog/{id}
Descrição: Exclui um blog existente com base no ID fornecido.
Parâmetros: id (Long) - O ID do blog a ser excluído.
Resposta: Código de status 204 No Content.

11. Adicionar Comentário a um Blog
Método: POST
Endpoint: /blog/comments/{id}
Descrição: Adiciona um comentário a um blog específico.
Parâmetros: id (Long) - O ID do blog ao qual o comentário será adicionado.
Requisição: Um objeto CommentDTO no corpo da requisição.
Resposta: O objeto CommentDTO do comentário criado.
Configuração de Segurança
A segurança da aplicação é gerenciada pela classe SecurityConfig, que utiliza Spring Security para proteger os endpoints. A autenticação é necessária para acessar os seguintes recursos:

Criar um blog (/blog/create)
Obter blogs (/blog/**)
Atualizar blogs (/blog/**)
Excluir blogs (/blog/**)
Adicionar comentários a blogs (/blog/comments/**)
Os usuários devem autenticar-se utilizando as rotas /auth/login e /auth/register, que estão disponíveis sem autenticação.
