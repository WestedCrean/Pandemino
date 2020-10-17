# Pandemino

System zdalnego prowadzenia wykładów

First, in the main folder execute

```shell
npm i
```
to install `lerna` and `husky` - dependencies common for `api` and `frontend` modules

Then install all projects dependencies 

```shell
lerna exec npm install
```

To run project backend and frontend

```shell
lerna run dev --parallel
```

and go to [http://localhost:3000](http://localhost:3000)

To run only Express.js backend or frontend (Next.js) run

```shell
lerna run dev --scope [frontend|backend]
```
