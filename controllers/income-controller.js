import Income from '../models/Income.js'
import { StatusCodes } from 'http-status-codes'
import Expense from '../models/Expense.js'

const getIncomes = async (req, res) => {
  const incomes = await Income.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Income retrieved",
      incomes: incomes
    })
}

const createIncome = async (req, res) => {
  await Income.create(req.body)
  res.status(StatusCodes.OK).json({ msg: "Income created", })
}

const updateIncome = async (req, res) => {
  await Income.findByIdAndUpdate(req.body._id, req.body)
  res.status(StatusCodes.OK).json({ msg: 'Income updated.' })
}

const deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.body._id)
  res.status(StatusCodes.OK).json({ msg: 'Income deleted.' })
}

export { getIncomes, createIncome, updateIncome, deleteIncome }

