var jwt = require('jsonwebtoken'); //npm install jsonwebtoken
var SEED = require('../Config/config').SEED;


//Verificar token (Middleware)
exports.verificaToken = (req, res, next) => {
    var token = req.query.token;
    jwt.verify(token, SEED, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                valido: false,
                mensaje: 'token inorrecto',
                errors: error
            });
        }
        req.usuario = decoded.usuario;
        next();

        /*return res.status(200).json({
            valido: true,
            decoded: decoded
        });*/
    });
}