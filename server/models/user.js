import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    myProducts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
})

const User = mongoose.model("USER", userSchema);
export default User;