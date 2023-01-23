const Flutterwave = require('flutterwave-node-v3');
const open = require('open');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');
const Transaction = require('../models/transactionModel');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

exports.chargeCard = async (req, res, next) => {
  const payload = {
    card_number: req.body.card_number,
    cvv: req.body.cvv,
    expiry_month: req.body.expiry_month,
    expiry_year: req.body.expiry_year,
    currency: process.env.CURRENCY,
    amount: req.body.amount,
    // redirect_url: '',
    fullname: req.body.fullname,
    email: req.body.email,
    phone_number: req.body.phone_number,
    enckey: process.env.FLW_ENCRYPTION_KEY,
    tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
  };
  try {
    const response = await flw.Charge.card(payload);
    console.log(response);

    // Authorizing transactions

    // For PIN transactions
    if (response.meta.authorization.mode === 'pin') {
      let payload2 = payload;
      payload2.authorization = {
        mode: 'pin',
        fields: ['pin'],
        pin: req.body.pin,
      };
      const reCallCharge = await flw.Charge.card(payload2);
      if (reCallCharge.status === 'success') {
        await Transaction.create(reCallCharge.data);
      }
      // console.log(reCallCharge);
      // Add the OTP to authorize the transaction
      // const callValidate = await flw.Charge.validate({
      //   otp: req.body.otp,
      //   flw_ref: reCallCharge.data.flw_ref,
      // });

      // console.log(callValidate);
      res.status(200).json({
        response,
        reCallCharge,
      });
    }
    // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
    if (response.meta.authorization.mode === 'redirect') {
      var url = response.meta.authorization.redirect;
      open(url);
    }

    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

exports.validateCard = async (req, res) => {
  try {
    const payload = {
      otp: req.body.otp,
      flw_ref: req.params.flw_ref,
    };

    const response = await flw.Charge.validate(payload);
    if (response.status === 'success') {
      const newData = await Transaction.create(response.data);
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};
