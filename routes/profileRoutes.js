const router = require('express').Router();
const {getData} = require('../controller/ProfileController');

router.get('/getdata', getData);
module.exports = router;