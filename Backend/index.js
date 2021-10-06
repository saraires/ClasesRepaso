"use strict"

const express = require('express');
const app = express();

const productos = require('./routes/productos');
// const path = require('path') 

// Middlerwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'resources')));

// Routes
app.get('/', (request, response) => {
    response.send("Hola chicos, ¿como van?");
})

app.use('/', productos);

// Inicializar un puerto
app.set('port', process.env.PORT | 3000);

// Levantar puerto
app.listen(app.get('port'), () =>{
    console.log(`Aplicacion corriendo en el puerto ${app.get('port')}!!`);
});


// --------- NOTAS ----------

// Archivo usado en el ejemplo del api fake db.json

// ¿Como crear una api fake?
// Instalamos el modulo con json server (npm i json-sever)
// Instanciamos en nuestro package json un script de server
// "server": "json-server --watch db.json"
// Creamos un archivo "db.json" en nuestro directorio raiz
// Corremos en la terminal el archivo con npm run server
// Listo! abre postman/insomnia y prueba hacer peticiones al archivo c;