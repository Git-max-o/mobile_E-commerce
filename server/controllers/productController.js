 // Assuming the model file is in the models folder
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        // Create a query object
        let query = {};

        // Enable product search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } }, // Case-insensitive search
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Filter products by category
        if (category) {
            query.category = category;
        }

        // Pagination setup
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 }); // Sort by newest products first

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts /limit),
            products,
        });
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate product ID format before querying
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }

        // Find product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            product,
        });
    } catch (error) {
        console.error(`Error fetching product: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Validate required fields
        if (!name || !price || !category || stock === undefined) {
            return res.status(400).json({ error: "Name, price, category, and stock are required" });
        }

        // Create a new product instance
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error(`Error creating product: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};