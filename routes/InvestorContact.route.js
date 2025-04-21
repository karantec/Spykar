const { createInvestorContact, getallInvestorContact } = require('../controller/InvestorContact.Controller');

const router = require('express').Router();

router.post('/create', createInvestorContact)
router.get('/getinvestorContact', getallInvestorContact);


module.exports = router;