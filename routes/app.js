var express = require('express');

var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        valido: true,
        mensaje: 'Peticion Realizada Correctamente'
    })
});

module.exports = app;