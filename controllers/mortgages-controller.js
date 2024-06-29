import Mortgage from '../models/Mortgage.js'
import { StatusCodes } from 'http-status-codes'

const getMortgages = async (req, res) => {
  const mortgages = await Mortgage.find()
  res.status(StatusCodes.OK)
    .json({
      msg: "Mortgages successfully retrieved",
      mortgages: mortgages
    })
}

const createMortgage = (req, res) => {
  const unit = req.params.unit
}

const editMortgage = (req, res) => {

}

export { getMortgages, createMortgage, editMortgage }
