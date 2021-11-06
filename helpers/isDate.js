const moment = require('moment');

const isDate = (value, {req})=>{

    if(!value){
        return false;
    }

    const date = moment(value);

    if(date.isValid()){
        return true;
    }
    else
    {
        throw new Error("La fecha no es valida");
    }

}

module.exports = isDate;