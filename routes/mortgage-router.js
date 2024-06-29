import express from 'express'
const router = express.Router()
import {getMortgages, createMortgage, updateMortgage, deleteMortgage } from "../controllers/mortgages-controller.js"

router.route("/")
  .get(getMortgages)
  .post(createMortgage)
  .patch(updateMortgage)
  .delete(deleteMortgage)


export default router