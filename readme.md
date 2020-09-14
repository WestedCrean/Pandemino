# Pandemino

System zdalnego prowadzenia wykładów

To manage this project you need to install [lerna](https://github.com/lerna/lerna)

```shell
npm i -g lerna
```

Then install all of project dependencies using lerna

```shell
lerna bootstrap
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
