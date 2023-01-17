const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mysql',
  },
);

module.exports = DB;
