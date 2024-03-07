const mongoose = require('mongoose');
// const {Schema} = require('mongoose');

const model = mongoose.Schema({
    accountName:{
        type:String,
        required:true
    },
    accountContact:{
        type:String,
        required:true
    },
    accountAddress:{
        type:String,
        required:true
    }
})

const accountModel = mongoose.model('Account',model)

module.exports = accountModel