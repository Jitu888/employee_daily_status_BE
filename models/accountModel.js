const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const model = mongoose.Schema({
    accountName:{
        type:String,
        required:true
    },
    accountContact:{
        type:String,
    },
    accountAddress:{
        type:String,
    },
    accountEmail:{
        type:String,
    },
    accountWebsiteUrl:{
        type:String
    },
    contact:[{ type: Schema.Types.ObjectId, ref: 'AccountContact' }]
    
    

})

const accountModel = mongoose.model('Account',model)

module.exports = accountModel