// modulo  de express
const express = require('express');
//dotenv
require('dotenv').config();
//mongoose
const {dbConnection} = require('./db/config');
//cors
const cors = require('cors');



//crear el servidor de express
const app = express();

//mongo atlas
dbConnection();

//escuchar peticiones (puerto, callback)
app.listen(process.env.PORT, ()=>{
    console.log(`[express] servidor corriendo en el puerto ${process.env.PORT}`);
});

//CORS
//middleware para manejar las cors 
//https://www.npmjs.com/package/cors
app.use(cors());

//configurar directorio publico 
//static es un middleware osea una funcion que se ejecuta cuando alguien hace una peticion al server
//como el index esta en la raiz solo indicamos la carpeta
app.use(express.static('public'));

//Lectura y parseo de body o la informacion entrante
//el middleware json nos permite interpretar los datos que enviamos a la api a formaato json
app.use(express.json());

//crear urls de api definiendo prefijo de la api  y concatenado con los endpoint segun el archivo 
//app.use(prefijo, archivo con los endpoint)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

