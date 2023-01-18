// const express = require('express');
// const Transaction = require('../models/transactionModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

// exports.getAllTransaction = catchAsync(async (req, res, next) => {
//   const response = await Transaction.findAll();

//   res.status(200).json({
//     status: 'success',
//     results: response.length,
//     data: response,
//   });
// });

// exports.getTransaction = catchAsync(async (req, res, next) => {
//   const transaction = await Transaction.findOne({
//     where: { reference: req.query.ref },
//   });

//   if (!transaction) {
//     return next(new AppError('No transaction found!'));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: transaction,
//   });
// });

// exports.updateTransaction = catchAsync(async (req, res, next) => {
//   const update = await Transaction.update(
//     req.body,
//     {
//       where: { id: req.params.pk },
//     },
//     { new: true },
//   );
//   if (!update) {
//     return next(new AppError('No user found with that ID'));
//   }
//   res.status(200).json({
//     status: 'success',
//     message: 'Transaction updated successfully',
//     data: update,
//   });
// });

// exports.deleteTransaction = catchAsync(async (req, res, next) => {
//   const user = await Transaction.destroy({
//     where: { id: req.params.pk },
//   });
//   if (!user) {
//     return next(new AppError('No user found with that ID'));
//   }

//   res.status(204).json({
//     data: null,
//   });
// });
