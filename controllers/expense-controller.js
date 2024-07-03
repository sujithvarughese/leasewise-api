import Expense from '../models/Expense.js'
import { StatusCodes } from 'http-status-codes'

const getExpenses = async (req, res) => {
  const expenses = await Expense.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Expenses retrieved",
      expenses: expenses
    })
}

const getUnitExpenses = async (req, res) => {
  const expenses = await Expense.find({ unit: req.params.unit })
  res.status(StatusCodes.OK)
    .json({
      msg: "Expense retrieved",
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

export { getExpenses, getUnitExpenses, createExpense, updateExpense, deleteExpense }