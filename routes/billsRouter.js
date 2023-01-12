const express = require('express');
const billsController = require('../controller/billPaymemtsController');

const router = express.Router();

router.post('/create-bill', billsController.createBill);

router.get('/bill-categories', billsController.getBillsCategories);

router.get('/billPaymentStatus/:refId', billsController.getStatus);

router.post('/validateBill', billsController.validateBill);

router.get('/bills-payment', billsController.getBillsPayment);

module.exports = router;
