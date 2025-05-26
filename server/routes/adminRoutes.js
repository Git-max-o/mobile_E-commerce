import express from "express";
import { getAdminDashboard, manageUsers, updateOrderStatus, manageProducts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", getAdminDashboard); // Dashboard Data
router.delete("/user/:id", manageUsers); // Delete User
router.put("/order/:id", updateOrderStatus); // Update Order
router.post("/product", manageProducts); // Manage Products (Add, Update, Delete)

export default router;
