import express from "express";
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder); // Create Order
router.get("/", getAllOrders); // Get All Orders
router.get("/:id", getOrderById); // Get Order by ID
router.put("/:id", updateOrderStatus); // Update Order Status
router.delete("/:id", deleteOrder); // Delete Order

export default router;
