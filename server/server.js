import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js"

const app = express();

const connection_url = 
    "mongodb+srv://praksatyal:lacynvNG1YekkVOQ@kinbech.q2mo9cm.mongodb.net/?retryWrites=true&w=majority&appName=KinBech"

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.use("/auth", authRoutes);

mongoose
  .connect(connection_url)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));