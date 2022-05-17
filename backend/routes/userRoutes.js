import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router()

userRouter.post('/', asyncHandler(async (req, res) => {
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        address: user.address
    });
}
))


export default userRouter