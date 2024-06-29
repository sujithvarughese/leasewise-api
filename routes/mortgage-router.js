import express from 'express'
const router = express.Router()
import {getMortgages, createMortgage, editMortgage } from "../controllers/mortgages-controller.js"

router.route("/:unit").post(createMortgage).patch(editMortgage)
router.route("/").get(getMortgages)

export default router