const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection =  async () =>{
    await mongoose.connect( process.env.MONGO_ATLAS_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.info('[mongoAtlas] online');
}

dbConnection().catch(err => console.log(err));

module.exports = {
    dbConnection
}