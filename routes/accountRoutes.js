const router = require('express').Router()
const {addAccount,getAllAccount, getAccountById, addContactPerson}  = require('../controller/accountController');

router.get("/get_all_accounts",getAllAccount)
router.post('/add_account',addAccount)
router.get('/get_account_by_id',getAccountById)
router.post('/add_new_contact',addContactPerson)

module.exports = router