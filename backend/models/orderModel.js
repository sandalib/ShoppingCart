import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        cartItems: { type: String, requred: true },
        fname: { type: String, requred: true },
        lname: { type: String, requred: true },
        address: { type: String, requred: true },
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;