const express = require('express');
const banksController = require('../controller/banksController');

const router = express.Router();

router.get('/all-banks', banksController.getBanks);

router.get('/:id/branches', banksController.getBranches);

// router.post('/bank_transfer', banksController.bank_trf);

router.post('/charge_ng_account', banksController.charge_ng_acct);

router.post('/bank_holder_details', banksController.verifyAcct);

router.post('/charge_ussd', banksController.ussd);

router.post('/send_to_account', banksController.initTrans);

router.post('/transfer_fee', banksController.getFee);

router.post('/flw-webhook', banksController.verifyWebhook);

router.post('/create_otp', banksController.createOTP);

router.post('/validate_otp/:reference', banksController.validateOTP);

router.get('/verify_transactions/:id', banksController.verifyTransactions);

/**
 * @swagger
 * components:
 *    schemas:
 *      Transaction:
 *        type: object
 *        required:
 *          -amount
 *          -currency
 *          -account_bank
 *          -account_number
 *          -narration
 *          -tx_ref
 *          -reference
 *          -debit_currency
 *          -phone_number
 *          -email
 *          -fullname
 *          -country
 *          -customer
 *          -id
 *          -fee
 *          -status
 *          -bank_name
 *          -bank_code
 *        properties:
 *           amount:
 *              type: Number
 *              description: The amount of the transaction
 *           currency:
 *              type: String
 *              description: The currency in which the transaction is done. Default is NGN
 *           account_bank:
 *              type: String
 *              description: This is the bank where the customer holds an account
 *           account_number:
 *              type: String
 *              description: This is the account number of the customer
 *           narration:
 *              type: String
 *              description: The narration of the transaction
 *           tx_ref:
 *              type: String
 *              description: The autogenerated reference of the transaction
 *           reference:
 *              type: String
 *              description: The autogenerated reference of the transaction
 *           debit_currency:
 *              type: String
 *              description: The currency in which the customer is debited. Default is NGN
 *           phone_number:
 *              type: Number
 *              description: The phone number of the customer
 *           email:
 *              type: String
 *              description: The email address of the customer
 *           country:
 *              type: String
 *              description: The country. Default is NG
 *           customer:
 *              type: String
 *              description: This details of a customer
 *           account:
 *              type: String
 *              description: This details of a customer's account
 *           id:
 *              type: String
 *              description: Autogenerated id from flutterwave
 *           fee:
 *              type: Number
 *              description: The fee of a transaction
 *           status:
 *              type: String
 *              description: The status of a transaction. Pending or failed or success
 *           bank_name:
 *              type: String
 *              description: The name of the customer's bank
 *           bank_code:
 *              type: String
 *              description: The unique flutterwave bank code for Nigerian bank
 *        example:
 *          amount: 1000
 *          currency: NGN
 *          account_bank: Access Bank(044)
 *          account_number: 0690000037
 *          narration: Salary for December
 *          tx_ref: Wynk-64563783
 *          reference: Wynk-64563783
 *          debit_currency: NGN
 *          email: max@example.com
 *          phone_number: 08090000000
 *          country: NG
 *          customer: Yemi Danjuma
 *          account: 0690000037 Access Bank(044) Yemi Danjuma
 *          id: 4563738
 *          fee: 10.75NGN
 *          status: success
 *          bank_name: Access Bank(044)
 *          bank_code: 044
 *
 */

/**
 * @swagger
 * tags:
 *    name: Banks
 *    description: The Wynk Flutterwave Bank Transactions Managing API
 */

/**
 * @swagger
 * /banks/all-banks:
 *    get:
 *      summary: Get All Banks in Nigeria. Pass in country code 'NG' in query field.
 *      tags: [Banks]
 *      parameters:
 *      - in: query
 *        name: country
 *        schema:
 *        type: string
 *        required: true
 *        description: This returns the list of all banks in Nigeria
 *      responses:
 *        200:
 *          description: Banks fetched successfully
 *          content:
 *             application/json:
 *                 schema:
 *                 type: String
 *                 example:
 *                     id: 1
 *                     code: '044'
 *                     name: Access Bank
 *        500:
 *          description: Internal Server error
 */

/**
 * @swagger
 * /banks/charge_ng_account:
 *    post:
 *      summary: Charge a customer's NUBAN
 *      tags: [Banks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  amount: 1000
 *                  account_bank: '044'
 *                  account_number: '0690000037'
 *                  email: max@example.com
 *                  phoneNumber: '09012345678'
 *                  fullName: Yemi Danjuma
 *      responses:
 *          200:
 *            description: Charge successful
 *            content:
 *                application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Transaction'
 *                    example:
 *                        id: 4099423
 *                        tx_ref: wynk-11806651
 *                        amount: 10000
 *                        currency: NGN
 *                        narration: Wynk Limited
 *                        status: successful
 *                        customer: Yemi Danjuma
 *                        account: '0690000037'
 *                        meta: Please dial *901*4*1# to get your OTP. Enter the OTP gotten in the field below
 *          400:
 *            description: Transaction Failed
 *
 *          500:
 *            description: Internal server error. Try again
 */

/**
 * @swagger
 * /banks/bank_holder_details:
 *    post:
 *      summary: Get or verify the details of a NUBAN.
 *      tags: [Banks]
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  account_bank: '044'
 *                  account_number: '0690000037'
 *      responses:
 *        200:
 *          description: Account details fetched
 *          content:
 *             application/json:
 *                 schema:
 *                 type: String
 *                 example:
 *                     account_number: '0690000037'
 *                     account_name: Ibra Mili
 *        500:
 *          description: Internal Server error
 */

/**
 * @swagger
 * /banks/charge_ussd:
 *    post:
 *      summary: Charge a customer via USSD
 *      tags: [Banks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  amount: 1000
 *                  account_bank: '044'
 *                  account_number: '0690000037'
 *                  email: max@example.com
 *                  phone_number: '09012345678'
 *                  fullname: Yemi Danjuma
 *      responses:
 *          200:
 *            description: Charge initiated
 *            content:
 *                application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Transaction'
 *                    example:
 *                        id: 4099423
 *                        tx_ref: wynk-11806651
 *                        amount: 10000
 *                        currency: NGN
 *                        narration: Wynk Limited
 *                        status: pending
 *                        customer: Yemi Danjuma
 *                        account: '0690000037'
 *                        meta: Please dial *889*767*5745#
 *          400:
 *            description: Transaction Failed
 *
 *          500:
 *            description: Internal server error. Try again
 */

/**
 * @swagger
 * /banks/send_to_account:
 *    post:
 *      summary: Send money to NUBAN
 *      tags: [Banks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  amount: 1000
 *                  account_bank: '044'
 *                  account_number: '0690000037'
 *                  narration: Payment for June
 *                  currency: NGN
 *      responses:
 *          200:
 *            description: Transfer Queued Successfully
 *            content:
 *                application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Transaction'
 *                    example:
 *                        id: 4099423
 *                        fee: 10.75
 *                        amount: 10000
 *                        currency: NGN
 *                        narration: Wynk Limited
 *                        status: NEW
 *                        reference: wynk-2172891
 *                        full_name: Bale Gary
 *                        account_number: '0690000037'
 *                        bank_name: ACCESS BANK NIGERIA
 *          400:
 *            description: Transaction Failed
 *
 *          500:
 *            description: Internal server error. Try again
 */

/**
 * @swagger
 * /banks/transfer_fee:
 *    post:
 *      summary: Get a transfer fee
 *      tags: [Banks]
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  amount: 1000
 *      responses:
 *        200:
 *          description: Transfer fee fetched
 *          content:
 *             application/json:
 *                 schema:
 *                 type: String
 *                 example:
 *                     currency: NGN
 *                     fee_type: value
 *                     fee: 10.75
 *        500:
 *          description: Internal Server error
 */

/**
 * @swagger
 * /banks/create_otp:
 *    post:
 *      summary: Create FlutterWave Generated OTP
 *      tags: [Banks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Transaction'
 *              example:
 *                  name: Kazan Hussein
 *                  email: kazan@example.com
 *                  phoneNumber: '08025678903'
 *      responses:
 *          200:
 *            description: OTP generated successfully
 *            content:
 *                application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/Transaction'
 *                    examples:
 *                       Email:
 *                         value:
 *                            medium: email
 *                            reference: CF-BARTER-20230119040729944303
 *                            otp: "6858911"
 *                            expiry: "2023-01-19T16:17:29.7531938+00:00"
 *                       sms:
 *                         value:
 *                            medium: sms
 *                            reference: CF-BARTER-20230119040730946084
 *                            otp: "6858911"
 *                            expiry: "2023-01-19T16:17:29.7531938+00:00"
 *
 *
 *          500:
 *            description: Internal server error. Try again
 */

/**
 * @swagger
 * /banks/validate_otp/{reference}:
 *    post:
 *      summary: Validate OTP sent to customer via email, sms or both.
 *      tags: [Banks]
 *      parameters:
 *      - in: path
 *        name: reference
 *        schema:
 *        type: string
 *        required: true
 *        description: Unique reference generated by Flutterwave after creating OTP
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Transaction'
 *                example:
 *                  otp: '6450685'
 *      responses:
 *        200:
 *          description: Otp Authenticated successfully
 *          content:
 *             application/json:
 *                 schema:
 *                 type: String
 *                 example:
 *                     status: success
 *                     message: Otp Authenticated successfully
 *                     data: null
 *        500:
 *          description: Internal Server error
 */

/**
 * @swagger
 * /banks/verify_transactions/{id}:
 *      get:
 *        summary: Get the status of a transaction
 *        tags: [Banks]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: This is the unique Flutterwave id generated when a transaction is initiated.
 *        responses:
 *          200:
 *            description: Transaction fetched successfully
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Transaction'
 *                  example:
 *                        id: 4099423
 *                        fee: 10.75
 *                        amount: 10000
 *                        currency: NGN
 *                        narration: Wynk Limited
 *                        status: NEW
 *                        reference: wynk-2172891
 *                        full_name: Bale Gary
 *                        account_number: '0690000037'
 *                        bank_name: ACCESS BANK NIGERIA
 *          404:
 *            description: No transaction found with that id
 *
 */

module.exports = router;
