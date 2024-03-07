const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const model = mongoose.Schema({
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   mobileNumber:{
    type:String
   },
   isAdmin:{
    type:Boolean,
    default:false
   }

})


const userModel = mongoose.model('Users',model);
module.exports = userModel;