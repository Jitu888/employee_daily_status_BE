const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const JWT_SECERET_KEY = "godfather@1234"
const { generateOTP } = require('../utility/randomOtpGenerator')
const { sendMailTo } = require('../utility/nodeMailer')
const moment = require('moment')

function toLowerCaseString(inputString) {
    return inputString.toLowerCase();
  }

exports.login = async (req, res) => {
    try {


        const { email, password } = req.body
        const lower_Email = toLowerCaseString(email)
        const emailExist = await userModel.findOne({ email: lower_Email })
        if (!emailExist) {
            return res.status(401).send({ success: false, msg: "invalid credentials", data: {} })
        }
        else {
            if (emailExist.password === password) {
                const token = jwt.sign({ email: emailExist.email }, JWT_SECERET_KEY)
                return res.status(200).send({ success: true, msg: "login successfull", token: token, data: emailExist })
            }
            else{
                return res.status(200).send({ success: false, msg: "Invalid credentials", token: "", data: {} })
            }
        }

    } catch (err) {
        res.status(500).send({ success: false, msg: err.message, data: {} })
    }
}


exports.register = async (req, res) => {
    try {
        const { email, password, mobile } = req.body
        const lower_Email = toLowerCaseString(email)
        req.body.email = lower_Email
        const isEmailAlreadyExist = await userModel.find({ email: lower_Email });
        if (isEmailAlreadyExist.length > 0) {
            res.status(401).send({ success: false, msg: "email Id already exist", data: "" })
        }
        else {

            const otp = generateOTP();
            req.body['otp'] = otp
            const emailStatus = await sendMailTo(
                [email],
                otp
            );
            if (emailStatus) {
                const user = new userModel(req.body)
                const result = await user.save();

                if (!result) {


                    res.status(500).send({ success: false, msg: "internal server error", data: "" })
                }
                else {


                    res.status(200).send({ success: true, msg: "user registered successfully", data: result })



                }
            }
        }


    }
    catch (err) {
        res.status(500).send({ success: false, msg: "something went wrong", err: err.message, data: [] })
    }
}

function isTimeNotGreaterThan10Minutes(databaseTime) {

    const databaseDateTime = moment(databaseTime).toDate();
    console.log(databaseDateTime)
    const currentTime = Date.now();
    console.log(currentTime)
    const timeDifferenceMs = currentTime - databaseDateTime;
    console.log(timeDifferenceMs)
    return timeDifferenceMs <= 600000;
}



exports.verifyAccountController = async (req, res, next) => {

    const { otp, email } = req.body;
    
    try {

        const result = await userModel.findOne({ email: email })
        const isExpired = isTimeNotGreaterThan10Minutes(result.otpExpiryTime)
        console.log("ffff",isExpired,result && result.otp === otp && isExpired,result && result.otp,otp)
        if (result && result.otp === otp && isExpired) {
            const updateAccount = await userModel.findByIdAndUpdate(
                { _id: result._id },
                { is_Verified: true },{
                new: true
            }
            );
            res.send({ status: "Account Verified", updateAccount });
        } else {
            res.send({ status: "Invalid OtP" });
        }
    } catch (err) {
        res.send({ msg: err.message });
         
    }
}

exports.getNewOtp = async(req,res)=>{
    try{
        const {email} = req.body
        const otp = generateOTP();
        const emailStatus = await sendMailTo(
            [email],
            otp
        );
        const currentDate = Date.now()
        const result = await userModel.findOne({ email: email })
        if(result){
            const updateAccount = await userModel.findByIdAndUpdate(
                { _id: result._id },
                { otp: otp,otpExpiryTime:currentDate }, {
                new: true
            }
            );
            res.send({ status: "otp sent successfully", updateAccount });
        }
        else{
            res.send({ status: "somthing went wrong try again" });
            
        }
    }
    catch(err){
        res.send({success:false,msg:err.message,data:[]})
    }

 

}

