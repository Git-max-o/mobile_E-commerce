import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// ✅ Get Admin Dashboard Summary
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      dashboard: { totalUsers, totalOrders, totalProducts },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Manage Users (Delete User)
export const manageUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = req.body.status || order.status;
    order.deliveredAt = req.body.deliveredAt || order.deliveredAt;
    await order.save();

    res.status(200).json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Manage Products (Add, Update, Delete)
export const manageProducts = async (req, res) => {
  try {
    const { action, productData } = req.body;

    if (action === "add") {
      const newProduct = new Product(productData);
      await newProduct.save();
      return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    }

    if (action === "update") {
      const updatedProduct = await Product.findByIdAndUpdate(productData._id, productData, { new: true });
      return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    }

    if (action === "delete") {
      await Product.findByIdAndDelete(productData._id);
      return res.status(200).json({ success: true, message: "Product deleted successfully" });
    }

    res.status(400).json({ success: false, message: "Invalid action" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
