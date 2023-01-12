const Flutterwave = require('flutterwave-node-v3');
const open = require('open');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

const payload = {
  card_number: '5531886652142950',
  cvv: '564',
  expiry_month: '09',
  expiry_year: '32',
  currency: 'NGN',
  amount: '100',
  redirect_url: 'https://www.wynk.ng',
  fullname: 'Brian Etaghene',
  email: 'brian@wynk.ng',
  phone_number: '09000000000',
  enckey: process.env.FLW_ENCRYPTION_KEY,
  tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
};

exports.chargeCard = async (req, res) => {
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
      console.log(reCallCharge);
      // Add the OTP to authorize the transaction
      const callValidate = await flw.Charge.validate({
        otp: req.body.otp,
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);
    }
    // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
    if (response.meta.authorization.mode === 'redirect') {
      var url = response.meta.authorization.redirect;
      open(url);
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
