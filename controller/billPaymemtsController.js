const Flutterwave = require('flutterwave-node-v3');
const Transaction = require('../models/transactionModel');
const AppError = require('../utils/appError');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

exports.createBill = async (req, res, next) => {
  try {
    const payload = {
      country: process.env.COUNTRY,
      customer: req.body.customerID,
      amount: req.body.amount,
      recurrence: 'ONCE',
      type: req.body.bill_type,
      reference: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
    };

    const response = await flw.Bills.create_bill(payload);
    if (response.status === 'success') {
      const newData = await Transaction.create(response.data);
    } else {
      return next(
        new AppError(
          'Transaction Failed. Insufficient funds in your wallet',
          400,
        ),
      );
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
    console.log(error);
  }
};

exports.getBillsCategories = async (req, res, next) => {
  try {
    let dataBundle = [];
    let airtime = [];
    let cableTV = [];
    const response = await flw.Bills.fetch_bills_Cat();
    for (const bill of response.data) {
      if (bill.biller_name.includes('MB') && bill.country == 'NG') {
        dataBundle.push({ name: bill.biller_name, amount: bill.amount });
      }
      if (bill.biller_name.includes('GB') && bill.country == 'NG') {
        dataBundle.push({ name: bill.biller_name, amount: bill.amount });
      }
      if (bill.biller_name.includes('VTU') && bill.country == 'NG') {
        airtime.push(bill.biller_name);
      }
      if (bill.biller_name.includes('DSTV') && bill.country == 'NG') {
        cableTV.push({
          name: bill.biller_name,
          amount: bill.amount,
          item_code: bill.item_code,
          biller_code: bill.biller_code,
        });
      }

      if (bill.biller_name.includes('GOTV') && bill.country == 'NG') {
        cableTV.push({
          name: bill.biller_name,
          amount: bill.amount,
          item_code: bill.item_code,
          biller_code: bill.biller_code,
        });
      }
    }

    res.status(200).json({
      bills: { dataBundle, airtime, cableTV },
      // response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getStatus = async (req, res) => {
  try {
    const payload = {
      reference: req.params.refId,
    };

    const response = await flw.Bills.fetch_status(payload);
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.validateBill = async (req, res, next) => {
  try {
    const payload = {
      item_code: req.body.item_code,
      code: req.body.biller_code,
      customer: req.body.customerID, //This is either phone number, DSTV or GOTV IUC number, electric meter No.
    };

    const response = await flw.Bills.validate(payload);
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBillsPayment = async (req, res) => {
  try {
    const payload = {
      from: '2019-08-01', //This is the start date it can be in any of this formats: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD
      to: '2020-08-27',
      page: '1', //This is the page you want to start from
      reference: '+233494850059', //
    };

    const response = await flw.Bills.fetch_bills(payload);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
  }
};
