import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, address } = req.body
    const user = await User.create({
        fname,
        lname,
        address
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname: user.lname,
            address: user.address
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export default registerUser