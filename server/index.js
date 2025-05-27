import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/database.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// Importing routes
import verifyToken from './middleware/verifyToken.js';  
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

app.use("/api", userRoutes);
app.use("/api/verify", verifyToken); // Middleware to verify token
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use('api/admin' ,adminRoutes)
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
connectDB()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
