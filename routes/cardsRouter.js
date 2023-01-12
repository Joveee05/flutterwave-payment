const express = require('express');
const cardsController = require('../controller/cardsController');

const router = express.Router();

router.post('/chargeCard', cardsController.chargeCard);

module.exports = router;
