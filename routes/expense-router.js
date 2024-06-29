import express from 'express'
const router = express.Router()
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expense-controller.js"

router.route("/")
  .get(getExpenses)
  .post(createExpense)
  .patch(updateExpense)
  .delete(deleteExpense)

export default router