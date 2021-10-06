"use strict"

const mysql = require('mysql2');

const conexion = mysql.createConnection({ // creamos conexion con base de datos
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productos',
    port: 3306
});

conexion.connect(function (err) { // hacemos una funcion para comprobar si realmente se esta estableciendo una conexion
    if (err){ // capturamos error
        console.log("Hay un error en la conexion");
        console.log(err); // mostramos error
    }
    console.log("Vamos bien!") // mesajito que nos dice que todo good
    
});

module.exports = {
    cnn_mysql: conexion // exportamos la conexion en una variable para usarla en nuestras rutas
}
