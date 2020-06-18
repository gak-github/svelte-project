const Transaction = require("../models/Transactions");
const _ = require('lodash');
let localStorage = require('../config/local-storage');
const isDev = !process.env.MONGO_PWD;

// @desc Get all transactions
// @route GET /api/v1/transations
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    if (isDev) {
      let localData = _.cloneDeep(localStorage);
      return res.status(200).json({
        success: true,
        count: localData.length,
        data: localData,
      });
    }

    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.count,
      data: transactions,
    })
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: error.message,
    })
  }
}

// @desc To add a transaction
// @route POST /api/v1/transations
// @access Public
exports.addTransaction = async (req, res, next) => {
  const { text, amount} = req.body
  if (isDev) {
    let newData = {
      _id: req.body.id,
      text: text,
      amount: amount
    };
    localStorage.push(newData);
    return res.status(201).json({
      success: true,
      data: newData,
    });
  }
  try {
    const transaction = await Transaction.create(req.body)
    return res.status(201).json({
      success: true,
      data: transaction,
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message)
      return res.send(500).json({
        success: false,
        error: messages,
      })
    } else {
      return res.send(500).json({
        success: false,
        error: "Server Error",
      })
    }
  }
}

// @desc To add a transaction
// @route DELETE /api/v1/transations/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  if (isDev) {
    let updated = localStorage.filter( (item) => item._id !== req.param.id);
    localStorage = updated;
    return res.status(200).json({
      success: true,
      data: [],
    });
  }
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      })
    }

    await transaction.remove()
    return res.status(200).json({
      success: true,
      data: [],
    })
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: "Server Error",
    })
  }
}