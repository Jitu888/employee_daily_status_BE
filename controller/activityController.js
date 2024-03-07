const activityModel = require('../models/activityModel');

exports.activityController = async (req, res) => {
    try {
        const data = new activityModel(req.body)
        const result = await data.save()
        if (result) {
            res.status(200).send({ success: true, msg: 'activity saved successfully', data: result })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'something went wrong', data: [] })
    }
}

exports.getActivityController = async (req, res) => {
    try {
        const { id } = req.query
        const result = await activityModel.find({ userId: id }).populate('account')
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

exports.getAllActivityController = async (req,res) => {
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