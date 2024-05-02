const router = require('express').Router()
const {getAllMetaData,getAllUsersList} = require('../controller/adminController');

router.get("/get_dashboard_data",getAllMetaData);
router.get("/get_users_List",getAllUsersList);


module.exports = router