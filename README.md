# Star Wars API

Task to build star wars API

## API Documentation

API documentation with examples response: [API](https://documenter.getpostman.com/view/9407876/UUxxg8A7)

## API Features

- Authentication with JWT (Reset Password with email)
- User Create, Read, Update and Delete (CRUD) operations
- API Security (NoSQL Injections, XSS Attacks, http param pollution etc)

## Configuration File

Modify the config/.env file to your environment variables

```ENV
NODE_ENV=development
PORT=3000

STARWARS_API=https://swapi.dev/api

MYSQL_HOST=mysql_server
MYSQL_USER=reagan
MYSQL_PASSWORD=secretpassword
MYSQL_DATABASE=starwars
MYSQL_ROOT_PASSWORD=secretpassword
```

## Installation

Install all npm dependecies

```console
npm install
```

Install nodemon globally

```console
npm install -g nodemon
```

## Run Server

```console
node run dev
```

## Using Docker

### Start Docker

```console
docker-compose up -d
```

### Stop Docker

```console
docker-compose down
```

## License

This project is licensed under the MIT License
