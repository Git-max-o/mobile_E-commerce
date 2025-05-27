import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const processPayment = async (req, res) => {
  try {
    const { amount, tokenId } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source: tokenId,
    });

    return res.status(200).json({ success: true, message: "Payment successful", charge });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

