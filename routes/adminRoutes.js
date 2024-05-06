const router = require('express').Router()
const {getAllMetaData,getAllUsersList,deleteUser,updateUserDetails} = require('../controller/adminController');

router.get("/get_dashboard_data",getAllMetaData);
router.get("/get_users_List",getAllUsersList);
router.delete('/delete_user_by_Id',deleteUser)
router.patch('/update_user_by_Id',updateUserDetails)

module.exports = router