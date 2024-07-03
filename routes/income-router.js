import express from 'express'
const router = express.Router()
import {getIncomes, getUnitIncomes, createIncome, updateIncome, deleteIncome} from "../controllers/income-controller.js"

router.route("/:unit").get(getUnitIncomes)
router.route("/")
  .get(getIncomes)
  .post(createIncome)
  .patch(updateIncome)
  .delete(deleteIncome)


export default router