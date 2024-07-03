import express from 'express'
const router = express.Router()
import {getMortgages, getUnitMortgages, createMortgage, updateMortgage, deleteMortgage } from "../controllers/mortgages-controller.js"

router.route("/:unit").get(getUnitMortgages)
router.route("/")
  .get(getMortgages)
  .post(createMortgage)
  .patch(updateMortgage)
  .delete(deleteMortgage)


export default router