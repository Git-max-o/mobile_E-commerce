import express from "express";
import { processPayment } from "../controllers/paymentController.js"; // Adjust path as needed

const router = express.Router();

router.post("/payment", processPayment);

export default router;
