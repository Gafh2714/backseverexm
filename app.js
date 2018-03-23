// Requires
var express = require('express');
var moongus = require('mongoose');

// Inicializar Variables
var app = express();

// Conexiómn a la bse de datos
moongus.connection.openUri('mongodb://localhost:27017/Hospitaldb', (error, res) => {
    if (error) throw error;

    console.log('Base de datos: 3000: \x1b[32m%s\x1b[0m', 'online');
});

//Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        valido: true,
        mensaje: 'Peticion Realizada Correctamente'
    })
});

// Ecuchar Peticiones

app.listen(3000, () => {
    console.log('Express Server Corriendo en el puerto: 3000: \x1b[32m%s\x1b[0m', 'online');
});