## Crear un monorepo usando el cli de angular

`--create-aplication false`: no crea la carpeta `src` 

```
ng new nombre-proyecto --create-application false
ng new nombre-proyecto --create-application=false
```

## Crear una aplicacion dentro del monorepo

Para cambiar la ruta de creacion de una aplicacion se debe 
modificar el archivo `angular.json` y la propiedad `newProjectRoot`

Para efectos del curso cambiaremos el valor de `newProjectRoot` a `apps`

A este comando se le puede pasar las opciones que se usan para generar un proyecto como: `--routing` `--style`

```
ng g app nombre-aplicacion
ng g application nombre-aplicacion
ng generate app nombre-aplicacion
ng generate application nombre-aplicacion
```
## Ejecutar applicacion

Ejecuta la aplicacion por defecto (primera aplicacion creada)

```
ng serve 
```

Ejecutar aplicacion especifica

```
ng serve nombre-aplicacion
```


## Instalacion de dependencias

### Angular Material

`ng add @angular/material`

### JWT Helper

Libreria para validar/decodificar jwt

`npm i @auth0/angular-jwt`

### Crypto JS

Libreria para validar/decodificar jwt

`npm i crypto-js`
`npm i -D @types/crypto-js`


## Ejecutar el servidor 

Primero instalar dependencias 

```
cd server
npm install
```

ruta del servidor corriendo `http://localhost:3000/api`

```
cd server
npm start
```

## colleccion postman

en la carpeta `server` se encuentra el archivo `CursoAngular.postman_collection`
