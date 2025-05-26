import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { product, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = await Cart.create({ user: userId, items: [{ product, quantity }] });
        else cart.items.push({ product, quantity });

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
        if (cart) res.json(cart);
        else res.status(404).json({ error: "Cart not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            cart.items = cart.items.filter(item => item._id.toString() !== itemId);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
