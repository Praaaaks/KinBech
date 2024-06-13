import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secret = "CE2022";

export const signup = async(req, res) => {
    const { name, email, password, mobile } = req.body;

    try{
    const oldUser = await User.findOne({ email });
    if(oldUser)
        return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
        name,
        email,
        password: hashedPassword,
        mobile,
    });

    res.status(201).json({ result });
    console.log(result);
    }
    catch(error){
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if(!oldUser)
        return res.status(404).json({ message: "User does not exist"});

    const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
    if(!isPasswordMatch){
        return res.status(400).json({ messgae: "Invaild Credentails" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "1h",
      });
  
    res.cookie("jwtoken", token, {
       expires: new Date(Date.now() + 3600000),
       httpOnly: true,
    });
    res.status(200).json({ 
        _id: oldUser._id,
        name: oldUser.name,
        email: oldUser.email,
        password: oldUser.password,
        mobile: oldUser.mobile,
        token: token
     });
}