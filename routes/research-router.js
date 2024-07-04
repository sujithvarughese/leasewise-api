import express from "express";
const router = express.Router()
import { getListingDetails, getListingsZipCode } from '../controllers/research-controller.js'

router.route("/listings/:id").get(getListingDetails)
router.route("/listings").post(getListingsZipCode)

export default router