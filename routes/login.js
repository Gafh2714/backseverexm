var express = require('express');
var app = express();
var bcrypt = require('bcrypt'); //npm install bcrypt
var jwt = require('jsonwebtoken'); //npm install jsonwebtoken
var Usuario = require('../models/usuario');

var SEED = require('../Config/config').SEED;

app.post('/', (req, res) => {
    var body = req.body;
    Usuario.findOne({ email: body.email }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                valido: false,
                mensaje: 'Error al buscar usuarios',
                errors: error
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                valido: false,
                mensaje: 'Credenciales incorrectas',
                errors: { message: 'email no existe' }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                valido: false,
                mensaje: 'Credenciales incorrectas',
                errors: { message: 'password invalido' }
            });
        }

        //Crear un token
        usuarioDB.password = ':D';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }) //4 horas


        return res.status(200).json({
            valido: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });
    });

});

module.exports = app;