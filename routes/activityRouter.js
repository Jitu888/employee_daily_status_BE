const router = require('express').Router()
const {activityController,getActicityBySearch,getActivityController,getAllActivityController,checkInCheckOut,getActivityById} = require('../controller/activityController');


router.get('/get_activity_by_userID',getActivityController)

router.get('/get_all_activities',getAllActivityController)

router.post('/add_activity',activityController)

router.get('/get_activity_by_search',getActicityBySearch)

router.patch('/checkin_CheckOut',checkInCheckOut)

router.get('/get_activity_by_ID',getActivityById)



module.exports = router