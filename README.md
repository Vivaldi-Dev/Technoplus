# Restful Node API

Este projeto é uma API RESTful desenvolvida com Node.js e utiliza o ORM **Sequelize** para interagir com o banco de dados PostgreSQL. A API permite a gestão de usuários e possui funcionalidades básicas de autenticação, como cadastro, login, logout e verificação de autenticação.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão estável)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Banco de Dados

1. **Atualize o arquivo `.env`**: Abra o arquivo `.env` existente na raiz do projeto e configure as credenciais do PostgreSQL. As seguintes configurações são apenas exemplos; você deve substituí-las pelas suas próprias credenciais ou usar as credenciais padrão do PostgreSQL:

    ```plaintext
    # Nome do usuário do PostgreSQL (padrão é 'postgres')
    DB_USERNAME=postgres

    # Senha do usuário do PostgreSQL (padrão é 'postgres')
    DB_PASSWORD=postgres

    # Nome do banco de dados que será utilizado
    DB_NAME=restfullnode

    # Endereço do servidor PostgreSQL (geralmente 'localhost' para desenvolvimento local)
    DB_HOST=localhost

    # Porta do servidor PostgreSQL (por padrão, é 5432)
    DB_PORT=5432
    ```

## Instalação

2. Instale as dependências do projeto com o seguinte comando:

    ```bash
    npm install
    ```

3. Crie o banco de dados e aplique as migrações necessárias:

    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

## Rotas

A API possui as seguintes rotas para gerenciamento de usuários:

- **POST /signup**: Cria um novo usuário. É necessário fornecer as credenciais no corpo da requisição.
- **POST /login**: Realiza o login de um usuário. Retorna um token de autenticação que será armazenado em um cookie se as credenciais forem válidas.
- **POST /logout**: Realiza o logout do usuário autenticado. Não é necessário fornecer um corpo; o token armazenado no cookie será usado.
- **GET /check-auth**: Verifica se o usuário está autenticado. É necessário fornecer o token de autenticação no cabeçalho da requisição.

## Exemplo de Uso

### Cadastro de Usuário

- **URL**: `http://localhost:3000/api/signup`
- **Método**: POST
- **Corpo**:

```json
{
    "name": "Nobela Viavdli",
    "email": "nobelavivaldid@gmail.com",
    "password": "123456"
}

### Login do Usuário
- **URL**: `http://localhost:3000/api/login`
- **Método**: POST
- **Corpo**:

```json
{
    "email": "nobelavivaldid@gmail.com",
    "password": "123456"
}

