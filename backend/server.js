import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT;

const __dirname = path.resolve();

// middleware
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

if(NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./frontend/dist", "index.html"));
    });
}

// server & db connection
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT + " on " + NODE_ENV + " mode");
});
