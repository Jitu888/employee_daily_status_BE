const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const { google } = require("googleapis");


const clientId = "630668604540-9gelb99035e2urd5mkogu2iifomhg3li.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken = "1//04bfa1d5PbveNCgYIARAAGAQSNwF-L9IrEE0kuaJidMh2wVU5b_-83g-iS4bXzXC0HjgT2veL-AjkZ8k-5eMySlGZzt7eGtkSB_Y";
const redirectUri = "https://developers.google.com/oauthplayground";
// const accessToken = "ya29.a0Ad52N3_3WxgL6ib7v3PcD4RSqA3v6bW1tkw-_w1Rkib2ccs4SxRd0fv7IBOk_m6u0D77r3VmHn8HLDEEX3NytQ6av1ZBZB6Z32HYapza0BQokvjKeww4Pj0YWHMQm4cg0DbGLv8g2T-40Sc67QC9y-IWydbE5PdnitWbaCgYKAZgSARASFQHGX2MiAz7s-p6kj8uenC7ZB0ESVw0171"





exports.sendMailTo = async (email) => {
    const OAuth2_client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    OAuth2_client.setCredentials({ refresh_token: refreshToken })

    const accessToken = await OAuth2_client.getAccessToken();

    var options = {
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "jitendra7518888@gmail.com",
            pass: '@Jite2024',
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    }

    const mailer = nodemailer.createTransport(options);


    const result = new Promise((resolve, reject) => {

        mailer.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}