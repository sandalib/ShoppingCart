import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js'
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    await Order.remove({});
    const createdOrders = await User.insertMany(data.orders);
    res.send({ createdProducts, createdUsers, createdOrders });
});
export default seedRouter;