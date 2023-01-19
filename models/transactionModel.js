const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const DB = require('../database');

const Transaction = DB.define('transactions', {
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
  fullname: {
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
  customer: [
    {
      type: sequelize.DataTypes.STRING,
    },
  ],
  card: [
    {
      type: sequelize.DataTypes.STRING,
    },
  ],
  account: [
    {
      type: sequelize.DataTypes.STRING,
    },
  ],
  id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
  },
  fee: {
    type: sequelize.DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: sequelize.DataTypes.STRING,
  },
  bank_name: {
    type: sequelize.DataTypes.STRING,
  },
  bank_code: {
    type: sequelize.DataTypes.INTEGER,
  },
});

module.exports = Transaction;
