import express from 'express'
const router = express.Router()
import {getRentPayments, createRentPayment, updateRentPayment, deleteRentPayment} from "../controllers/rents-controller.js"

router.route("/")
  .get(getRentPayments)
  .post(createRentPayment)
  .patch(updateRentPayment)
  .delete(deleteRentPayment)


export default router