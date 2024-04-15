const router = require('express').Router()
const {login,register,verifyAccountController,getNewOtp} = require('../controller/auth');


router.post('/login',login)

router.post('/register',register)

router.patch('/verify',verifyAccountController)

router.patch('/get_OTP',getNewOtp)


module.exports = router