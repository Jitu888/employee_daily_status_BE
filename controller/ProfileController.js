const dataModel = require('../models/profileModel');
const { sendMailTo } = require('../utility/nodeMailer');
exports.getData = async (req, res) => {
    try {
        const data = await dataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.subscribeProfile = async (req, res) => {
    try {
        const { email } = req.body;
        const doc = await dataModel.findOne();
        doc.isSubscribed.push(email);
        await doc.save();
        sendMailTo({
            to: [email],
            from: 'jitendra7518888@gmail.com',
            subject: 'Subscription Confirmation',
            text: 'Thank you for subscribing to our profile updates!'
        });
        res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}