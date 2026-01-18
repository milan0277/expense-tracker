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
      minlength: 3,
      maxlength: 100,
    },
    Description: {
      type: String
    },
    Category: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const expenseModel = mongoose.model("expense", expenseSchema);
module.exports = expenseModel;
