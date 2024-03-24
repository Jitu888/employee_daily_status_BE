const activityModel = require('../models/activityModel');
const accountModel = require('../models/accountModel')
exports.activityController = async (req, res) => {
    console.log(req.body)
    try {
        const data = new activityModel(req.body)
        const result = await data.save()
        if (result) {
            res.status(200).send({ success: true, msg: 'activity saved successfully', data: result })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'something went wrong', data: [], err: err })
    }
}

exports.getActivityController = async (req, res) => {
    try {

        const { id, page = 1, limit = 10 } = req.query
        const skip = (page - 1) * limit;
        const result = await activityModel.find({ userId: id }).populate('account').skip(skip).limit(limit)
        if (result) {
            res.status(200).send({ success: true, msg: '', data: result })
        }
        else {
            res.status(500).send({ success: false, msg: 'internal server error', data: [] })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'internal server error', data: [] })
    }
}

exports.getAllActivityController = async (req, res) => {
    try {
        const result = await activityModel.find().populate('account')
        if (result) {
            res.status(200).send({ success: true, msg: '', data: result })
        }
        else {
            res.status(500).send({ success: false, msg: 'internal server error', data: [] })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'internal server error', data: [] })

    }
}


exports.getActicityBySearch = async (req, res) => {
    try {
        const { id, searchKey, page = 1, limit = 10 } = req.query
        const skip = (page - 1) * limit;
        const accountIds = await accountModel.find({ accountName: { $regex: searchKey, $options: 'i' } }, '_id');
        console.log(accountIds)
        const result = await activityModel
            .find({ userId: id, account: { $in: accountIds } })
            .populate('account')
            .skip(skip)
            .limit(limit);

        if (result) {
            res.status(200).send({ success: true, msg: '', data: result })
        }
        else {
            res.status(500).send({ success: false, msg: 'internal server error', data: [] })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, msg: 'internal server error', data: [] })

    }
}