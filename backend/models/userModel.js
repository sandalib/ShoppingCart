import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        fname: { type: String, requred: true },
        lname: { type: String, requred: true },
        address: { type: String, requred: true },
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;