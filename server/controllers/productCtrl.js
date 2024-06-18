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

export const getAll = async (req, res) => {
    try {
      const products = await Product.find()
      .sort({ view_count: -1})
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

export const getProduct = async (req, res) => {
    try {
      let product = await Product.findById(req.params._id);
      const view_count = product.view_count + 1;
      product = await Product.findByIdAndUpdate(req.params._id, {view_count})
      res.status(200).json(product);
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

export const getProductBySearch = async (req, res) => {
  const { searchQuery, category } = req.query;
  try {
      let query = {};

      if (searchQuery) {
          query.title = new RegExp(searchQuery, "i");
      }

      if (category) {
          query.tags = category;
      }

      const products = await Product.find(query);
      res.json(products);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};