## Installation

```bash
$ npm install

$ cp .env.example .env
# заполнить .env
# ADMIN_LOGIN и ADMIN_PASSWORD - это данные для входа в админку

# запустить сиды
# Тут генерируется акк админа и заполняется бд
$ npm run seed

# возможно нужно будет расширить права на папку upload, чтобы файлы из этой папки были доступны в инете

# если по какой-то причине сиды обваливаются, значит что-то с бд. Надо вначале запустить сервак в режиме IS_DEV=true, затем попробовать еще раз сиды
# т.е. меняем IS_DEV в .env на тру. Запускаем npm run start. После успеха останавливаем сервак. Меняем IS_DEV на IS_DEV=false. Затем npm run seed
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
