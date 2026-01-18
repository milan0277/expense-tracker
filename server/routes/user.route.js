const express = require("express");
const router = express.Router();
const {createUser,login,updateMonthlyBudget,getMonthLyBudget} = require('../controller/user.controller')

router.post('/createuser',createUser);
router.post('/login',login);
router.put('/updatebudget',updateMonthlyBudget)
router.post('/getbudget',getMonthLyBudget)

module.exports = router;