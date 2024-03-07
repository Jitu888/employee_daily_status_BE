const userModel = require('../models/userModel')

exports.login = async (req, res) => {
    try {


        const { email, password } = req.body
        const pattern = /kloudrac/i;
        const containsKloudrac = pattern.test(email);
        if (!containsKloudrac) {
            res.status(400).send({ success: false, msg: "login with kloudrac email id", data: "" })
        }
        else {


            const emailExist = await userModel.findOne({ email: email })
            if (!emailExist) {
                res.status(401).send({ success: false, msg: "invalid credentials", data: "" })
            }
            else {
                if (emailExist.password === password) {
                    res.status(200).send({ success: true, msg: "login successfull", data: emailExist })
                }
            }
        }

    } catch (err) {
        res.status(500).send({ success: false, msg: "something went wrong", data: "" })
    }
}


exports.register = async (req, res) => {
    try {
        const { email, password, mobile } = req.body
        const pattern = /kloudrac/i;
        const containsKloudrac = pattern.test(email);
        if (!containsKloudrac) {
            res.status(400).send({ success: false, msg: "Please register with kloudrac email id", data: "" })
        }
        else {
            const isEmailAlreadyExist = await userModel.find({ email: email });
            if (isEmailAlreadyExist.length > 0) {
                res.status(401).send({ success: false, msg: "email already exist", data: "" })
            }
            else {
                const user = new userModel(req.body)
                const result = await user.save();
                if (!result) {
                    res.status(500).send({ success: false, msg: "internal server error", data: "" })
                }
                else {
                    res.status(200).send({ success: false, msg: "user registered successfully", data:result })

                }
            }
        }

    }
    catch (err) {

    }
}