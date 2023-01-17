const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const DB = require('../database');

const Transactions = DB.define('transactions', {
  amount: {
    type: sequelize.DataTypes.DECIMAL(10, 2),
  },
  currency: {
    type: sequelize.DataTypes.STRING,
    defaultValue: 'NGN',
  },
  account_bank: {
    type: sequelize.DataTypes.STRING,
  },
  account_number: {
    type: sequelize.DataTypes.BIGINT(10),
  },
  narration: {
    type: sequelize.DataTypes.STRING,
  },
  tx_ref: {
    type: sequelize.DataTypes.STRING,
  },
  reference: {
    type: sequelize.DataTypes.STRING,
  },
  debit_currency: {
    type: sequelize.DataTypes.STRING,
    defaultValue: 'NGN',
  },
  email: {
    type: sequelize.DataTypes.STRING,
  },
  phone_number: {
    type: sequelize.DataTypes.BIGINT(11),
  },
  country: {
    type: sequelize.DataTypes.STRING,
    defaultValue: 'NGN',
  },
  customerID: {
    type: sequelize.DataTypes.STRING,
  },
  status: {
    type: sequelize.DataTypes.STRING,
  },
  credit: {
    type: sequelize.DataTypes.STRING,
  },
  debit: {
    type: sequelize.DataTypes.STRING,
  },
});

module.exports = Transactions;
