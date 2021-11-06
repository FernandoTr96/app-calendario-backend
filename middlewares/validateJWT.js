const {response, request} = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJWT = (req = request, res = response, next)=>{

    //x-token headers
    const token = req.header('x-token');
    
    if(!token){
        
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion !!'
        })
    }
    
    try {

        const payload = jwt.verify(
            token,
            process.env.JWTKEY
        )

        req.auth = {...payload};
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}