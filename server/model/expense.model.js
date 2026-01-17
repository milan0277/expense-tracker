const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    Description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    Category: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    spending: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const expenseModel = mongoose.model('expense',expenseSchema);
module.exports = expenseModel ;

