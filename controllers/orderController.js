const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;

//user order buat frontend
const placeOrder = async (req, res) => {

    //const frontend_url = "https://dilan-bakery-fe.vercel.app/";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "sgd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 10
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "sgd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 10
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

module.exports = { placeOrder }