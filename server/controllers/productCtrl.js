import Product from "../models/products.js";
import User from "../models/user.js";

export const createProduct = async(req, res) => {
    const title = req.body.title;
    const userID = req.user._id.toString();
    const price = req.body.price;
    const description = req.body.description;
    const tags = req.body.tags;
    const url = req.body.url;

    console.log("This is the user id: ", userID);

    const user = await User.findById(userID);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const newProduct = new Product({
        title,
        price,
        description,
        tags,
        image_url: url,
        creator: userID,
    })

    try{
        await newProduct.save();
        const savedProduct = await Product.findOne({ title });
        console.log(savedProduct);
        const productID = savedProduct._id;
        const update = await User.findByIdAndUpdate(userID, {
            $push: { myProducts: productID },
        });
        res.status(201).json(update);
    }
    catch(error){
        console.log(userID);
        res.status(409).json({message: error.message});
    }
}