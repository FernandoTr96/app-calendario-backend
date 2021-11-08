const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (uid,name,email)=>{

    return new Promise((resolve, reject)=>{

        const payload = {
            uid,
            name,
            email
        }

        jwt.sign(payload, process.env.JWTKEY, {
            
            expiresIn: '2h'

        }, (err, token)=>{
            
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })

    })

}

module.exports  = {
    generateJWT
}