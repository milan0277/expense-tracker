const express = require("express");
const router = express.Router();
const {addExpense,getExpenseReport,getUserSummary} = require('../controller/expense.controller')
router.post('/addexpense',addExpense);
router.post('/getreport',getExpenseReport)
router.get('/:userId/summary',getUserSummary)

module.exports = router ;
