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
    bookmarks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    image_url: String,
})

const User = mongoose.model("USER", userSchema);
export default User;