const {response, json} = require('express');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../helpers/jwt');
const UserModel = require('../models/UserModel');

//https://www.restapitutorial.com/httpstatuscodes.html

const login = async (req,res=response)=>{

    //en la parte del body del req viene la informacion del posteo
    const {email,password} = req.body;

    try {

        //buscar email en la db
        const user = await UserModel.findOne({email});
        //si no existe tira error
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña es incorrecta'
            })
        }

        //si existe comparar contraseñas       
        const passwordMatch = bcrypt.compareSync(password, user.password);
        //si no coinciden tirar error
        if(!passwordMatch){
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña es incorrecta'
            })
        }

        //si coinciden generar JWT https://www.npmjs.com/package/jsonwebtoken
        const token = await generateJWT(user.id, user.name);
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: `Error ${err.code} : no fue posible realizar la accion, comuniquese con soporte tecnico `
        })

    }

}

const register = async (req,res=response)=>{
    
    //en la parte del body del req viene la informacion del posteo
    const {name,email,password} = req.body;

    try {

        let isRegistered = await UserModel.findOne({email});
    
        if(isRegistered){
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya esta registrado !!'
            })
        }

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        const user = new UserModel({
            name,
            email,
            password: hash
        });    

        await user.save();   

        //generar JWT https://www.npmjs.com/package/jsonwebtoken
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: `El usuario [ ${user.name} ] fue registrado !!`,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (err) {

        res.status(400).json({
            ok: false,
            msg: `Error ${err.code} : no fue posible realizar la accion, comuniquese con soporte tecnico `
        })

    }

}

const revalidarToken =  async (req,res=response)=>{
    
    const {uid,name} = req.auth;
    const token = await generateJWT(uid,name);

    if(token){
        return res.status(201).json({
            ok: true,
            token
        })
    }

    res.status(401).json({
        ok: false,
        msg: 'no se pudo generar un nuevo token'
    })

}

module.exports = {
    login,
    register,
    revalidarToken
}