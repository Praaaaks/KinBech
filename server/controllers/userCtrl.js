import User from "../models/user.js";

export const signup = async(req, res) => {
    const { name, email, password, mobile } = req.body;

    const oldUser = await User.findOne({ email });
    if(oldUser)
        return res.status(400).json({ message: "User already exists" });

    const result = await User.create({
        name,
        email,
        password,
        mobile,
    });

    res.status(201).json({ result });
}

export const signin = async(req, res) => {
    const { email, password } = req.body;


}