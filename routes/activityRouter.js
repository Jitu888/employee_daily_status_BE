const router = require('express').Router()
const {activityController,getActivityController,getAllActivityController} = require('../controller/activityController');


router.get('/get_activity_by_userID',getActivityController)

router.get('/get_all_activities',getAllActivityController)

router.post('/add_activity',activityController)


module.exports = router