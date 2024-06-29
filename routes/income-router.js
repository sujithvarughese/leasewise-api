import express from 'express'
const router = express.Router()
import {getIncomes, createIncome, updateIncome, deleteIncome} from "../controllers/income-controller.js"

router.route("/")
  .get(getIncomes)
  .post(createIncome)
  .patch(updateIncome)
  .delete(deleteIncome)


export default router