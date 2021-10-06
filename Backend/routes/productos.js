const express = require('express');
const { cnn_mysql } = require('../db/conexion'); // es la variable que exportamos de nuestro archivo de conexion...
const router = express.Router();

// Peticiones GET

// Traer productos
router.get('/obtenerproductos', (req, res) => { // creamos la ruta a la que vamos a hacer las peticiones
    cnn_mysql.query('SELECT * FROM articulos', (error, resultset, field) => { // ejecutamos un query, recordemos siempre tener una manejo de errores con un try-catch
        if (error) { // carpturamos el error
            return res.status(500).send("se presento un error");
        } else {
            return res.status(200).json(resultset); // mostramos los resultados de la consulta
        }
    });
});

// Traer productos por id
router.get('/obtenerproductos/:id', (req, res) => {
    const id = req.params.id;
    cnn_mysql.query('SELECT * FROM articulos WHERE id = ?', [id], (error, resultset, field) => {
        if (error) {
            return res.status(500).send("se presento un error")
        } else {
            return res.status(200).json(resultset);
        }
    });
});

// Peticiones POST

// Agregar productos
router.post('/cargarproductos', async (req, res) => {
    try {
        const { id, nombre, cantidad, precio } = req.body;
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO articulos(id, nombre, cantidad, precio) VALUES (NULL, ?, ?, ?)`, [nombre, cantidad, precio]);

        if (rows.affectedRows > 0) {
            res.json({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                precio: precio
            })
        } else {
            console.log(e);
            res.json("No se pudo agregar la orden");
        }

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Peticiones PUT

// Editar productos por id

router.put("/actualizarorden/:id", async (req, res) => {

    try {
        const { nombre, cantidad, precio } = req.body
        const id = req.params.id;
        const [rows, fields] = await cnn_mysql.promise().execute(`UPDATE articulos SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?`, [nombre, cantidad, precio, id]);

        if (rows.affectedRows > 0) {
            res.json({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                precio: precio
            })
        } else {
            console.log(e);
            res.json("No se pudo actualizar la orden");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }


});

// Peticiones DELETE

// Eliminar datos (todo en la bd)
router.delete('/eliminarproductos', (req, res) => {
    try {
        cnn_mysql.query('DELETE FROM articulos');
        res.status(200).json({"status": "Productos eliminados"});
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }

});

// Eliminar con "where"
router.delete('/eliminarproductosid/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const [rows, fields] = await cnn_mysql.promise().execute('DELETE FROM articulos WHERE id = ?', [id]);
        res.status(200).json({"status": "Producto eliminado con exito"});
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;