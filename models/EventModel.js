const {Schema, model} = require('mongoose');

const eventSchema = Schema({   

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    //este campo es una referencia para saber quien creo el evento
    //es el equivalente a una llave foranea en sql
    user: {
        type: Schema.Types.ObjectId,  //indicamos que el campo es una referencia
        ref: 'users' //indicamos a que tabla o coleccion hace referencia
    }

});

//cambiar estructura del id y version del documento
eventSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('events',eventSchema);