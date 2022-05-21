import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js'
import Customer from '../models/userModel.js';
import Order from '../models/orderModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await Customer.remove({});
    const createdCustomers = await Customer.insertMany(data.Customers);
    await Order.remove({});
    const createdOrders = await Order.insertMany(data.orders);
    res.send({ createdProducts, createdCustomers, createdOrders });
});
export default seedRouter;