const Flutterwave = require('flutterwave-node-v3');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

exports.getBanks = async (req, res) => {
  try {
    const payload = {
      country: req.body.country, //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
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

exports.bank_trf = async (req, res) => {
  try {
    const payload = {
      tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
      amount: '15000',
      currency: 'NGN',
      email: 'joveee05@gmail.com',
      phone_number: '08119858137',
      narration: 'Wynk Salary for May',
    };

    const response = await flw.Charge.bank_transfer(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.charge_ng_acct = async (req, res) => {
  try {
    const payload = {
      tx_ref: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
      amount: '10000',
      account_bank: '044',
      account_number: '0690000037',
      currency: 'NGN',
      email: 'joveee05@gmail.com',
      phone_number: '09000000000',
      fullname: 'Flutterwave Developers',
    };

    const response = await flw.Charge.ng(payload);
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
      account_number: '0690000040',
      account_bank: '044',
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
      account_bank: '058',
      amount: '1500',
      currency: 'NGN',
      email: 'user@flw.com',
      phone_number: '07033923458',
      fullname: 'Yemi Desola',
    };

    const response = await flw.Charge.ussd(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.initTrans = async (req, res) => {
  try {
    const payload = {
      account_bank: '032', //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
      account_number: '0066338814',
      amount: 1000,
      narration: 'test',
      currency: 'NGN',
      reference: 'wynk-' + Math.floor(Math.random() * 100000000 + 1), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
      callback_url: 'https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d',
      debit_currency: 'NGN',
    };

    const response = await flw.Transfer.initiate(payload);
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
      amount: '5000',
      currency: 'NGN',
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
      length: 7,
      customer: {
        name: 'Kazan',
        email: 'joveee05@gmail.com',
        phone: '2348119858137',
      },
      sender: 'Wynk Limited',
      send: true,
      medium: ['email', 'sms'],
      expiry: 5,
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
      otp: '0986517',
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
