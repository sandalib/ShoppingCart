import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        cartItems: [{
            name: { type: String, requred: true },
            quantity: { type: Number, requred: true },
            price: { type: String, requred: true },
        }],
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;