const passwordMatch = (value, {req})=>{
    if(value !== req.body.password){
        throw new Error('Las contraseñas no coinciden');
    }  
    return true;
}

module.exports = passwordMatch;