const accountModel = require('../models/accountModel')


exports.addAccount = async (req, res) => {
    try {
        const account = new accountModel(req.body)
        const result = await account.save()
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


exports.getAllAccount = async (req, res) => {
    try {

        const result = await accountModel.find()
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