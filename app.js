const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('sequelize');
const path = require('path');
const DB = require('./database');
const billsRouter = require('./routes/billsRouter');
const banksRouter = require('./routes/banksRouter');
const cardsRouter = require('./routes/cardsRouter');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wynk Limited FlutterWave API',
      version: '1.0.0',
      description: 'The FlutterWave API',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
    ],
    components: {
      securitySchemes: {
        // bearerAuth: {
        //   type: 'http',
        //   scheme: 'bearer',
        //   bearerFormat: 'JWT',
        // },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Wynk FlutterWave API',
    Author: 'Brian Etaghene<brian@wynk.ng>',
  });
});

DB.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

app.use('/api/bills/', billsRouter);
app.use('/api/banks/', banksRouter);
app.use('/api/cards/', cardsRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
