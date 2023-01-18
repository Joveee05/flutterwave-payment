const express = require('express');
const banksController = require('../controller/banksController');
const transController = require('../controller/transController');

const router = express.Router();

router.post('/all-banks', banksController.getBanks);

router.get('/:id/branches', banksController.getBranches);

// router.post('/bank_transfer', banksController.bank_trf);

router.post('/charge_ng_account', banksController.charge_ng_acct);

router.post('/bank_holder_details', banksController.verifyAcct);

router.post('/ussd', banksController.ussd);

router.post('/send_to_account', banksController.initTrans);

router.post('/transfer_fee', banksController.getFee);

router.post('/create_otp', banksController.createOTP);

router.post('/validate_otp/:reference', banksController.validateOTP);

router.get('/verify_transactions/:id', banksController.verifyTransactions);

module.exports = router;
