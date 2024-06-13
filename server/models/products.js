import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    tags: {
        type: Array,
        required: true
    },
    image_url: String,
})

const Product = mongoose.model("Product", productSchema);
export default Product;