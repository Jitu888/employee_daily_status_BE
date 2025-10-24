const express = require('express');
const app = express();
const mongoose = require("mongoose");
const api_version = "api/v1";
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRouter');
const accountRoutes = require('./routes/accountRoutes');
const uploadRouter = require('./utility/fileUpload');
const adminRoutes = require('./routes/adminRoutes')
const profileRoutes = require('./routes/profileRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const env = require('dotenv');
env.config();

(() => {
    body_parser();
    db_config();
    routes_config();
    global_Error_Handler();
})();

function db_config() {
    try{
     const connect =  mongoose.connect("mongodb+srv://jitu:1999@cluster0.0lsnx.mongodb.net/employee_daily_activity?retryWrites=true&w=majority");
     if(connect){
        console.log("database connected")
     } 
    }
    catch(err){
        console.log(err)
    }

}


function body_parser() {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(cors());
}

function routes_config() {
   app.use('/',authRoutes)
   app.use('/',activityRoutes)
   app.use('/',accountRoutes)
   app.use('/',uploadRouter)
   app.use('/',adminRoutes)
   app.use('/', profileRoutes);
   app.use('/', paymentRoutes);
}

function global_Error_Handler() {
    app.use((err, req, res, next) => {
        const errorStatus = req.status || 500;
        const error = err.message && [err.message] || err || "Internal Server Error";
        res.status(errorStatus).send({ error })
    })
}
module.exports = app;