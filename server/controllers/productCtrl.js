import Product from "../models/products.js";
import User from "../models/user.js";
import mongoose from "mongoose";

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

export const getAll = async (req, res) => {
    try {
      const products = await Product.find()
      .sort({ bookmark_count: -1})
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getMyProducts = async (req, res) => {
    try {
      const userId = req.user._id;
      const products = await Product.find({ creator: userId });
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getBookmarks = async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const products = await Product.find({ bookmark_users: userId });
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params._id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const addBookmark = async(req, res) => {
    const userId = req.user._id.toString();
    const currentEmail = req.user.email;
    const productId = req.params._id.toString();

    const oldProduct = await User.findOne({
        bookmarks: mongoose.Types.ObjectId(productId),
    });

    if (!oldProduct) {
        const addFav = await User.findOneAndUpdate(
        { email: currentEmail },
        {
            $push: { bookmarks: recipeId },
        }
        );
        const addProduct = await PostRecipe.findByIdAndUpdate(recipeId, {
        $push: { bookmark_users: userId },
        $inc: { bookmark_count: 1 }
        });
        res.status(200).json("added");
    } else if (oldProduct) {
        res.status(400).send("This product is already bookmarked.");
    } else {
        res.status(500).send("something went wrong");
    }
};

export const deleteBookmark = async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const productId = req.params._id;
      const userUpdate = await User.findByIdAndUpdate(userId, {
            $pull: { bookmarks: productId },
        });
        const productUpdate = await Product.findByIdAndUpdate(productId, {
            $inc: { bookmark_count: -1 },
            $pull: { bookmark_users: userId },
      });
      res.status(202).json({ message: `Deleted Successfully` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const recipeId = req.params._id;
        const userUpdate = await User.findByIdAndUpdate(userId, {
          $pull: { myProducts: recipeId },
        });
        const recipe = await Product.findByIdAndDelete(recipeId);
  
        res.status(202).json({ message: `Deleted Successfully` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const checkBookmark = async (req, res) => {
    const productId = req.params.id;
  
    const oldProduct = await User.findOne({
      bookmarks: mongoose.Types.ObjectId(productId),
    });
  
    if (oldProduct) {
      res.status(200).send(true);
    } else {
      res.status(500).send("something went wrong");
    }
};

export const getProductBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const title = new RegExp(searchQuery, "i");
      const recipes = await Product.find({ title: title });
      res.json(recipes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};