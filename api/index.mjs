"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
const mongoose = require("mongoose");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;
const cors  = require("cors");
const path = require('path');
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer")
//const authRoutes = require("./routes/auth.mjs");
import authRoutes from "./routes/auth.mjs"
import { verifyToken, isAdmin } from './middleware/auth-middleware.mjs'
const dotenv = require('dotenv');
require ('dotenv').config()

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, '.', 'public')))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '.', 'public') + '/browser/index.html');
});
app.use("/product", verifyToken, isAdmin, productRoutes)
app.use("/category", verifyToken, isAdmin,categoryRoutes);
app.use("/brand", verifyToken, isAdmin,brandRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth",authRoutes);

async function connectDb(){
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error conectando a MongoDB', err));
}
app.listen(PORT, ()=>{
    console.log('App is running on port: ', PORT)
    connectDb();
});
