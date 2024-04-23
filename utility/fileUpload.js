const stream = require('stream')
const express = require('express')
const multer = require('multer')
const path = require('path')
const { google } = require('googleapis')


const uploadRouter = express.Router()
const upload = multer()

const KEYFILEPATH = path.join(__dirname, "gApi.json")
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

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
            role:'reader',
            type:'anyone'
        },
        fields: 'id'
    })

    const fileId = data.id;
    const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

   return fileUrl
}

uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { body, file } = req
        console.log(body,"seperrsttiuy",file)
        // let fileResult = []
        // for (let f = 0; f < files.length; f++) {
          const result = await uploadFile(file)
        //    fileResult.push(result)
        // }
        console.log(result)
        res.status(200).send({success:true,msg:'uploaded successfully',data:result})
    }
    catch (err) {
        res.send(err)
    }
})



module.exports = uploadRouter