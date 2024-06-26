import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secret = "CE2022";

const authenticate = async (req, res, next) => {
  let token;

  if (req.cookies.jwtoken) {
    try {
      token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, secret);
      const user = await User.findOne({ email: verifyToken.email });
      req.user = user;
      //res.status(200).send("authenticated");
      next();
    } catch (error) {
      res.status(401).send("Unauthorized User");
    }
  }

  if (!token) {
    res.status(401).send("No Token");
  }
}

export default authenticate;