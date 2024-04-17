const accountModel = require('../models/accountModel')
const contactModel = require('../models/contactModel')


exports.addAccount = async (req, res) => {
    try {

        const contact = new contactModel({ contactPersonName: req.body.contactPersonName, contactPersonNumber: req.body.contactPersonNumber })
        const savedContact = await contact.save()
        const account = new accountModel({ ...req.body, contact: savedContact._id })
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


exports.getAccountById = async (req, res) => {
    try {

        const result = await accountModel.findOne({ _id: req.query.id }).populate('contact')
        if (result) {

            res.status(200).send({ success: true, msg: '', data: result.contact })
        }
        else {
            res.status(500).send({ success: false, msg: 'internal server error', data: [] })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, msg: 'internal server error', data: [] })

    }
}

exports.addContactPerson = async (req, res) => {
    try {
        const account = await accountModel.findById(req.query.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        const newContact = new contactModel({
            contactPersonName: req.body.contactPersonName,
            contactPersonNumber: req.body.contactPersonNumber
        });
        await newContact.save();
        account.contact.push(newContact._id);
        await account.save();

        res.status(201).send({ success:true, message: 'Contact added successfully', data: newContact });
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).send({ success:false, message: '', data: [],err:err  });
    }
}


