import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Customer from '../models/userModel.js';

const orderRouter = express.Router()

orderRouter.post('/', asyncHandler(async (req, res) => {
    const newOrder = new Order({
        cartItems: req.body.cartItems.map((x) => ({ ...x, product: x._id })),
    });
    const customer = new Customer({
        fname: req.body.customer.fname,
        lname: req.body.customer.lname,
        address: req.body.customer.address,
    });
    const user = await customer.save();
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
    res.status(201).send({ message: 'New Customer Added', user });
}
))


export default orderRouter