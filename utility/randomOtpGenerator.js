exports.generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) { // Generating 4-digit OTP
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


