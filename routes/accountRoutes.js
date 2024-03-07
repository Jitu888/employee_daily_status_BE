const router = require('express').Router()
const {addAccount,getAllAccount}  = require('../controller/accountController');

router.get("/get_all_accounts",getAllAccount)
router.post('/add_account',addAccount)

module.exports = router