const stream = require('stream')
const express = require('express')
const multer = require('multer')
const path = require('path')
const { google } = require('googleapis')
const cloudinary = require('../utility/cloudinary')


const uploadRouter = express.Router()
// const upload = multer()

// const KEYFILEPATH = path.join(__dirname, "gApi.json")
// const SCOPES = ['https://www.googleapis.com/auth/drive']

// const auth = new google.auth.GoogleAuth({
//     keyFile: KEYFILEPATH,
//     scopes: SCOPES
// })

const upload = multer({ dest: "uploads/" });

const uploadFile = async (fileObj) => {
    const bufferStream = new stream.PassThrough()
    bufferStream.end(fileObj.buffer)
    const { data } = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({
        media: {
            mimeType: fileObj.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileObj.originalname,
            parents: ['1BxjgnTBZN1lJIdFl4rH1BmDbA_47SY4L'],
            role: 'reader',
            type: 'anyone'
        },
        fields: 'id'
    })

    const fileId = data.id;
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    return fileUrl
}

uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
         console.log(req.file)
        const cloudinaryResponse = await  cloudinary.uploader.upload(req.file.path);
        console.log(cloudinaryResponse)
        res.status(200).send({ success: true, msg: 'uploaded successfully', data: cloudinaryResponse.secure_url })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})



module.exports = uploadRouter