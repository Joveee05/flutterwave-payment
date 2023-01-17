const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('sequelize');
const path = require('path');
const DB = require('./database');
const billsRouter = require('./routes/billsRouter');
const banksRouter = require('./routes/banksRouter');
const cardsRouter = require('./routes/cardsRouter');
dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Wynk FlutterWave API',
    Author: 'Brian Etaghene',
  });
});

DB.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

app.use('/api/bills/', billsRouter);
app.use('/api/banks/', banksRouter);
app.use('/api/cards/', cardsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
