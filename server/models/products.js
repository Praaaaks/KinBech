import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: String,
    tags: {
        type: String,
        required: true
    },
    bookmark_count: Number,
    image_url: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const Product = mongoose.model("Product", productSchema);
export default Product;