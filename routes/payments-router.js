import express from 'express'
const router = express.Router()
import { getPayments, createPayment, updatePayment, deletePayment } from "../controllers/payments-controller.js"

router.route("/")
  .get(getPayments)
  .post(createPayment)
  .patch(updatePayment)
  .delete(deletePayment)

export default router