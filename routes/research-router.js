import express from "express";
const router = express.Router()
import { getListingsZipCode } from "../controllers/research-controller.js";

router.route("/listings").post(getListingsZipCode)

export default router