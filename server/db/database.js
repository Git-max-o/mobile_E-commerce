import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Database connected successfully: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
