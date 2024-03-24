const router = require('express').Router()
const {activityController,getActicityBySearch,getActivityController,getAllActivityController} = require('../controller/activityController');


router.get('/get_activity_by_userID',getActivityController)

router.get('/get_all_activities',getAllActivityController)

router.post('/add_activity',activityController)

router.get('/get_activity_by_search',getActicityBySearch)


module.exports = router