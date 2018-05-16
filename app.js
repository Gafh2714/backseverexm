// Requires
var express = require('express');
var moongus = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar Variables
var app = express();

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importar Rutas
var appRoute = require('./routes/app');
var UsuariosRoute = require('./routes/usuario');
var LoginRoute = require('./routes/login');

// Conexiómn a la bse de datos
moongus.connection.openUri('mongodb://localhost:27017/Hospitaldb', (error, res) => {
    if (error) throw error;

    console.log('Base de datos: 3000: \x1b[32m%s\x1b[0m', 'online');
});

//Rutas
app.use('/usuario', UsuariosRoute);
app.use('/login', LoginRoute);
app.use('/', appRoute);


// Ecuchar Peticiones

app.listen(3000, () => {
    console.log('Express Server Corriendo en el puerto: 3000: \x1b[32m%s\x1b[0m', 'online');
});