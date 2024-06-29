import Payment from '../models/Payment.js'
import { StatusCodes } from 'http-status-codes'

const getPayments = async (req, res) => {
  const payments = await Payment.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Payments successfully retrieved",
      payments: payments
    })
}

const createPayment = async (req, res) => {

}

const updatePayment = async (req, res) => {

}

const deletePayment = async (req, res) => {

}

export { getPayments, createPayment, updatePayment, deletePayment }