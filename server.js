const express = require('express');
const app = express();
const mongoose = require("mongoose");
const api_version = "api/v1";
const cors = require('cors');

(() => {
    body_parser();
    db_config();
    routes_config();
    global_Error_Handler();
})();

function db_config() {
    mongoose.connect("mongodb+srv://jitu:1999@cluster0.0lsnx.mongodb.net/employee_daily_activity?retryWrites=true&w=majority", (err) => {
        if (!err) {
            console.log("database connected succcessfully");
        }
        else {
            console.log("err", err);
        }
    });

}


function body_parser() {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(cors());
}

function routes_config() {
  
}

function global_Error_Handler() {
    app.use((err, req, res, next) => {
        const errorStatus = req.status || 500;
        const error = err.message && [err.message] || err || "Internal Server Error";
        res.status(errorStatus).send({ error })
    })
}
module.exports = app;