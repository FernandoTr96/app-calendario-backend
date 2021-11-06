//paquete para validaciones con express
//npm i express-validator

const { response } = require('express');
const { validationResult } = require('express-validator');

//next es una funcion que hay que llamar cuando el middleware 
//cumpla su funcion para evaluar el siguiente

const errorMiddleware = (req, res = response, next) => {
    
    //express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}

module.exports = errorMiddleware;