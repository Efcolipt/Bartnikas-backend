## Installation

```bash
$ npm install

$ cp .env.example .env
# заполнить .env
# ADMIN_LOGIN и ADMIN_PASSWORD - это данные для входа в админку

# Запускаем миграции (создает бд)
$ npm run migration:run

# запустить сиды
# Тут генерируется акк админа и заполняется бд
$ npm run seed

# возможно нужно будет расширить права на папку upload, чтобы файлы из этой папки были доступны в инете
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
