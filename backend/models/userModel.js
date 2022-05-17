import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fname: { type: String, requred: true },
        lname: { type: String, requred: true },
        address: { type: String, requred: true },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;