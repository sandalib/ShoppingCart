import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const orderRouter = express.Router()

orderRouter.post('/checkout', asyncHandler(async (req, res) => {
    const newOrder = new Order({
        cartItems: req.body.cartItems.map((x) => ({ ...x, product: x._id })),
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
}
))


export default orderRouter