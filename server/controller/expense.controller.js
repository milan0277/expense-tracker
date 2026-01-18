import expense from "../model/expense.model.js";
import mongoose from "mongoose";

const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setHours(0, 0, 0, 0);

const today = new Date();

export const addExpense = async (req, res) => {
  try {
    const { userId, title, description, category, amount, date } = req.body;

    const newExpense = new expense({
      userID: userId,
      Title: title,
      Description: description,
      Category: category,
      Amount: amount,
      Date: date,
    });
    await newExpense.save();

    return res.status(201).json({ message: "success" });
  } catch (err) {
    console.error("error at addExpense function", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getExpenseReport = async (req, res) => {
  try {
    const { userId } = req.body;

    const getReport = await expense.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userId),
          Date: {
            $gte: startOfMonth,
            $lte: today,
          },
        },
      },
      {
        $group: {
          _id: "$userID",
          totalExpenses: { $sum: "$Amount" },
          expenseCount: { $sum: 1 },
          report: { $push: "$$ROOT" },
        },
      },
    ]);

    return res.status(200).json(getReport);
  } catch (err) {
    console.error("error at getExpenseReport function", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getUserSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const userSummary = await expense.aggregate([
      {
        $match: {
          userID: new mongoose.Types.ObjectId(userId),
          Date: {
            $gte: startOfMonth,
            $lte: today,
          },
        },
      },
      {
        $group: {
          _id: "$userID",
          totalExpenses: { $sum: "$Amount" },
          expenseCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          totalExpensesForCurrentMonth: "$totalExpenses",
          numberOfExpensesAdded: "$expenseCount",
          remainingMonthlyBudget: {
            $cond: {
              if: {
                $lt: [
                  { $subtract: ["$user.monthlybudget", "$totalExpenses"] },
                  0,
                ],
              },
              then: 0,
              else: {
                $subtract: ["$user.monthlybudget", "$totalExpenses"],
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json(userSummary);
  } catch (err) {
    console.error("error at getUserSummary function", err);
    return res.status(500).json({ error: "internal server error" });
  }
};
