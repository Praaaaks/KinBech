import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import protectedRoutes from "./routes/protected.js"
import productRoutes from "./routes/product.js"

const app = express();

const connection_url = 
    "mongodb+srv://praksatyal:lacynvNG1YekkVOQ@kinbech.q2mo9cm.mongodb.net/?retryWrites=true&w=majority&appName=KinBech"

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/", protectedRoutes);
app.use("/product", productRoutes);

mongoose
  .connect(connection_url)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));