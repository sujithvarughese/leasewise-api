import RentPayment from '../models/RentPayment.js'
import { StatusCodes } from 'http-status-codes'

const getRentPayments = async (req, res) => {
  const rents = await RentPayment.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Rent Payments successfully retrieved",
      rents: rents
    })
}

const createRentPayment = async (req, res) => {

}

const updateRentPayment = async (req, res) => {

}

const deleteRentPayment = async (req, res) => {

}

export { getRentPayments, createRentPayment, updateRentPayment, deleteRentPayment }

