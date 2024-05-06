const activityModel = require('../models/activityModel');
const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
exports.activityController = async (req, res) => {
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
        const { searchKey, id, page, limit, startDate, endDate, activityType } = req.query
        const skip = (page - 1) * limit;

        let filter = { userId: id }

        if (startDate && endDate) {
            filter.activityDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        if (activityType) {
            filter.activityType = activityType
        }
        const totalPages = await activityModel.find(filter)

        if (searchKey && searchKey.length > 0) {
            const skip = (page - 1) * limit;

            const accountIds = await accountModel.find({ accountName: { $regex: searchKey, $options: 'i' }, }, '_id');
            const totalPagesCount = await activityModel.find({ userId: id, account: { $in: accountIds }, ...filter })
            const result = await activityModel
                .find({ userId: id, account: { $in: accountIds }, ...filter })
                .populate('account')
                .skip(skip)
                .limit(limit).sort({ activityDate: -1 });
            if (result) {
                res.status(200).send({ success: true, msg: '', data: result, totalPages: totalPagesCount.length })
            }
            else {
                res.status(500).send({ success: false, msg: 'internal server error', data: [] })
            }
        }
        else {

            const result = await activityModel.find(filter).skip(skip).limit(limit).sort({ activityDate: -1 }).populate({ path: 'account', populate: { path: 'contact' } }).exec();
            console.log(result.length)
            if (result) {
                res.status(200).send({ success: true, msg: '', data: result, totalPages: totalPages.length })
            }
            else {
                res.status(500).send({ success: false, msg: 'internal server error', data: [] })
            }
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: err.message, data: [] })
    }
}

exports.getAllActivityController = async (req, res) => {
    try {
        const result = await activityModel.find().populate([{path:'account',model:accountModel},{path:'userId',model:userModel}])
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

exports.checkInCheckOut = async (req, res) => {
    try {
        const { location, isCheckedIn, time, id } = req.body
        console.log(isCheckedIn)
        if (isCheckedIn) {
            const obj = { checkInLocation: location, checkInTime: time, isCheckedIn: isCheckedIn }
            const result = await activityModel.findOneAndUpdate({ _id: id }, obj)
            if (result) {
                res.status(200).send({ success: true, msg: 'check in successfully', data: result })
            }
            else {
                res.status(500).send({ success: false, msg: 'something went wrong', data: [] })
            }
        }
        else {
            const obj = { checkOutLocation: location, checkOutTime: time, isCheckedIn: isCheckedIn }
            const result = await activityModel.findOneAndUpdate({ _id: id }, obj, { new: true })
            if (result) {
                res.status(200).send({ success: true, msg: 'check out successfully', data: result })
            }
            else {
                res.status(500).send({ success: false, msg: 'something went wrong', data: [] })
            }
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: err.message, data: [] })
    }
}

exports.getActivityById = async (req, res) => {
    const { id } = req.query
        
    try {
        const result = await activityModel.findOne({ _id: id }).populate({ path: 'account', populate: { path: 'contact' } }).exec()
        if (result) {
            res.status(200).send({ success: true, msg: '', data: result})
        }
        else {
            res.status(500).send({ success: false, msg: 'internal server error', data: [] })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'internal server error', data: [] })
    }
}
