const mongoose = require('mongoose');
// const {Schema} = require('mongoose');

const model = mongoose.Schema({
    contactPersonName:{
       type:String
    },
    contactPersonNumber:{
        type:String
    }
    

})

const contactModel = mongoose.model('AccountContact',model)

module.exports = contactModel