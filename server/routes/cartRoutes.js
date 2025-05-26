import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/:userId", addToCart);
router.get("/:userId", getCart);
router.delete("/:userId/:itemId", removeFromCart);

export default router;
