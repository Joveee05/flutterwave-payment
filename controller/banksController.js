const Flutterwave = require('flutterwave-node-v3');
const Transaction = require('../models/transactionModel');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

exports.getBanks = async (req, res) => {
  try {
    const payload = {
      country: req.query.country, //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
    };
    const response = await flw.Bank.country(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBranches = async (req, res) => {
  try {
    const payload = {
      id: req.params.id, //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
    };
    const response = await flw.Bank.branches(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.bank_trf = async (req, res) => {
//   try {
//     const payload = {
//       tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
//       amount: '15000',
//       currency: 'NGN',
//       email: 'joveee05@gmail.com',
//       phone_number: '08119858137',
//       narration: 'Wynk Salary for May',
//     };

//     const response = await flw.Charge.bank_transfer(payload);
//     res.status(200).json({
//       response,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.charge_ng_acct = async (req, res, next) => {
  try {
    const payload = {
      tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
      amount: req.body.amount,
      account_bank: req.body.account_bank,
      account_number: req.body.account_number,
      currency: 'NGN',
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      fullname: req.body.fullName,
      passcode: req.body.DOB,
    };

    const response = await flw.Charge.ng(payload);
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

exports.verifyAcct = async (req, res) => {
  try {
    const payload = {
      account_number: req.body.account_number,
      account_bank: req.body.account_bank,
    };
    const response = await flw.Misc.verify_Account(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.ussd = async (req, res) => {
  try {
    const payload = {
      tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
      account_bank: req.body.account_bank,
      amount: req.body.amount,
      currency: process.env.CURRENCY,
      email: req.body.email,
      phone_number: req.body.phone_number,
      fullname: req.body.fullname,
    };

    const response = await flw.Charge.ussd(payload);
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

exports.initTrans = async (req, res, next) => {
  try {
    const payload = {
      account_bank: req.body.account_bank, //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
      account_number: req.body.account_number,
      amount: req.body.amount,
      narration: req.body.narration,
      currency: req.body.currency,
      reference: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
      callback_url: process.env.callback_url,
      debit_currency: process.env.CURRENCY,
    };
    const response = await flw.Transfer.initiate(payload);
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

exports.getFee = async (req, res) => {
  try {
    const payload = {
      amount: req.body.amount,
      currency: process.env.CURRENCY,
    };

    const response = await flw.Transfer.fee(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createOTP = async (req, res) => {
  try {
    const payload = {
      length: process.env.LENGTH,
      customer: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phoneNumber,
      },
      sender: process.env.SENDER,
      send: true,
      medium: ['email', 'sms'],
      expiry: process.env.EXPIRY,
    };

    const response = await flw.Otp.create(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.validateOTP = async (req, res) => {
  try {
    const payload = {
      reference: req.params.reference,
      otp: req.body.otp,
    };

    const response = await flw.Otp.validate(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyTransactions = async (req, res) => {
  try {
    const payload = { id: req.params.id }; //This is the transaction unique identifier. It is returned in the initiate transaction call as data.id
    const response = await flw.Transaction.verify(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.verifyWebhook = async (req, res) => {
  try {
    // If you specified a secret hash, check for the signature
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = req.headers['verify-hash'];
    if (!signature || signature !== secretHash) {
      // This request isn't from Flutterwave; discard
      res.status(401).json({
        status: 'Failed',
        message: 'Verification Failed',
      });
    } else {
      const payload = req.body;
      // It's a good idea to log all received events.
      if (response.status === 'success') {
        await Transaction.create(response.data);
      }
      // Do something (that doesn't take too long) with the payload
      res.status(200).json({
        status: 'Success',
        message: 'Verification Successful',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
