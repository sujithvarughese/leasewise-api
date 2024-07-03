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

const getUnitMortgages = async (req, res) => {
  const mortgages = await Mortgage.find({ unit: req.params.unit })
  res.status(StatusCodes.OK)
    .json({
      msg: "Mortgage successfully retrieved",
      mortgages: mortgages
    })
}

const createMortgage = async (req, res) => {
  const mortgage = await Mortgage.create(req.body)
  res.status(StatusCodes.CREATED)
    .json({
      msg: "success",
      mortgage: mortgage
    });
}

const updateMortgage = (req, res) => {

}

const deleteMortgage = (req, res) => {

}

export { getMortgages, getUnitMortgages, createMortgage, updateMortgage, deleteMortgage }
