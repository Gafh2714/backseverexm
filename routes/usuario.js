var express = require('express');
var app = express();
var bcrypt = require('bcrypt'); //npm install bcrypt
var Usuario = require('../models/usuario');
var middlewareAuth = require('../middlewares/autenticacion');

//Obtener todos los usuarios
app.get('/', (req, res, next) => {
    Usuario.find({},
        'nombre email img role').exec(
        (error, usuarios) => {
            if (error) {
                return res.status(500).json({
                    valido: false,
                    mensaje: 'Error Cargando Usuarios!',
                    errors: error
                });
            } else {
                return res.status(200).json({
                    valido: true,
                    usuarios: usuarios
                });
            }
        }
    );
});


//Actualizar usuario
app.put('/:id', middlewareAuth.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (error, usuario) => {
        if (error) {
            return res.status(500).json({
                valido: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }
        if (!usuario) {
            return res.status(400).json({
                valido: false,
                mensaje: `El usuario con el id ${id} no existe`,
                errors: { message: 'No existe un usuario con el id' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.save((error, usuarioGuardado) => {
            if (error) {
                return res.status(400).json({
                    valido: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: error
                });
            }
            usuarioGuardado.password = "";
            return res.status(200).json({
                valido: true,
                usuario: usuarioGuardado
            });
        });
    });
});

//Crear nuevo usuario
app.post('/', middlewareAuth.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((error, usuarioGuardado) => {
        if (error) {
            return res.status(400).json({
                valido: false,
                mensaje: 'Error al crear usuario!',
                errors: error
            });
        } else {
            return res.status(201).json({
                valido: true,
                usuario: usuarioGuardado,
                usuariotoken: req.usuario
            });
        }
    });
});



//Eliminar usuario
app.delete("/:id", middlewareAuth.verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
        if (error) {
            return res.status(500).json({
                valido: false,
                mensaje: 'Error al borrar usuario!',
                errors: error
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                valido: false,
                mensaje: `No existe un usuario con el id ${id}`,
                errors: { message: 'No existe un usuario con el id' }
            });
        }
        return res.status(200).json({
            valido: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;