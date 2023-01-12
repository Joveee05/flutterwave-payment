const Flutterwave = require('flutterwave-node-v3');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

exports.createBill = async (req, res, next) => {
  try {
    const payload = {
      country: 'NG',
      customer: '+2348025151564',
      amount: 100,
      recurrence: 'ONCE',
      type: 'AIRTIME',
      reference: 'wynk-' + Math.floor(Math.random() * 100000000 + 1),
    };

    const response = await flw.Bills.create_bill(payload);
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
      if (bill.biller_name.includes('MB' && 'GB') && bill.country == 'NG') {
        dataBundle.push(bill.biller_name);
      }
      if (bill.biller_name.includes('VTU') && bill.country == 'NG') {
        airtime.push(bill.biller_name);
      }
      if (bill.biller_name.includes('DSTV') && bill.country == 'NG') {
        cableTV.push(bill.biller_name);
      }

      if (bill.biller_name.includes('GOTV') && bill.country == 'NG') {
        cableTV.push(bill.biller_name);
      }
    }

    res.status(200).json({
      bills: [dataBundle, airtime, cableTV],
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error,
    });
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
      item_code: 'AT099',
      code: 'BIL099',
      customer: '08025151564',
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
