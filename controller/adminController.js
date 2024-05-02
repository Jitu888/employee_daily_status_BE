const userModel = require('../models/userModel')
const accountModel = require('../models/accountModel')
const activityModel = require('../models/activityModel');



exports.getAllMetaData = async (req, res) => {
    try {


        const pipeline = [{
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }

        }]
        const data = await Promise.all([
            userModel.aggregate([{
                $count: 'totalUser'
            }]),
            accountModel.aggregate([{
                $count: 'totalAccount'
            }]),
            activityModel.aggregate([{
                $count: 'totalActivity'
            }]),
            activityModel.aggregate(pipeline)
        ])

        res.status(200).send({ success: true, msg: '', data: data.flat() })
    }
    catch (err) {
        res.status(500).send({ success: false, msg: err.message, data: [] })

    }
}

exports.getAllUsersList = async (req, res) => {
    try {
        const users = await userModel.aggregate([{
            $match: {
                isAdmin: false
            }
        }])
        res.status(200).send({ success: true, msg: "", data: users })
    }
    catch(err){
        res.status(500).send({ success: false, msg:err.message, data:[] })
    }
}

