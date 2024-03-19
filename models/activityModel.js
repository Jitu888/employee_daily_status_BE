const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const model = mongoose.Schema({
    activityDate:{
        type:Date,
        default:Date.now()
    },
    activityType:{
        type:String,
        required:true
    },
    relatedType:{
        type:String,
        required:true,
        default:"account"
    },
    account:{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    checkInLocation:{
        type:String
    },
    checkOutLocation:{
        type:String
    },
    checkInTime:{
       type:Date
    },
    checkOutTime:{
       type:Date
    },
    isCheckedIn:{
        type:Boolean,
        default:false
    },
    activityDuration:{
         type:String
    },
    remarks:{
        type:String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    files:{
        type:Array
    },
    status:{
        type:String
    },
    nextAction:{
        type:String
    }
})

const activityModel = mongoose.model('Activities',model);

module.exports = activityModel