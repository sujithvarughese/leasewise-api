import Expense from '../models/Expense.js'
import { StatusCodes } from 'http-status-codes'

const getExpenses = async (req, res) => {
  const expenses = await Expense.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Payments retrieved",
      expenses: expenses
    })
}

const createExpense = async (req, res) => {
  await Expense.create(req.body)
  res.status(StatusCodes.OK).json({ msg: "Expense created", })
}

const updateExpense = async (req, res) => {
  await Expense.findByIdAndUpdate(req.body._id, req.body)
  res.status(StatusCodes.OK).json({ msg: 'Expense updated.' })
}

const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.body._id)
  res.status(StatusCodes.OK).json({ msg: 'Expense deleted.' })
}

export { getExpenses, createExpense, updateExpense, deleteExpense }