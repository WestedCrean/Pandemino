# `api`

REST API zbudowane w Nodejs, Express przy pomocy TypeScript

## Usage

Przed uruchomieniem aplikacji, utwórz w głównym folderze plik `.env` zawierający:

```
# .env

API_PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=pandemino
```

Do uruchomienia potrzebny będzie zainstalowany Docker oraz docker-compose

> Jeśli docker długo buduje obraz, sprawdźcie czy w głównym folderze istnieje .dockerignore którym jest dodane node_modules

```shell
docker-compose build
```

i

```shell
docker-compose up
```

[Building and running nodejs typescript postgresql app with Docker](https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73)
