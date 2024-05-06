const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const model = mongoose.Schema({
   email:{
    type:String,
    required:true,
    index: true
   },
   password:{
    type:String,
    required:true
   },
   name:{
     type:String,
     required:true
   },
   mobileNumber:{
    type:String
   },
   isAdmin:{
    type:Boolean,
    default:false
   },
   is_Verified:{
    type:Boolean,
    default:0
   },
   otp:{
    type:String
   },
   otpExpiryTime:{
    type:Date,
    default:Date.now()
   },
   profileImg:{
    type:String
   }

})


const userModel = mongoose.model('Users',model);
module.exports = userModel;