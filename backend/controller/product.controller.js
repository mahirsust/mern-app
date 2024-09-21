import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true, 
            data: products
        });
    } catch (error) {
        console.log(`Error while fetching products: ${error.message}`);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.log(`Error while fetching product: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }   
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body;

        if(!product.name || !product.price || !product.image) {
            return res.status(400).json({
                success: false, 
                message: "Please fill all fields"
            });
        }

        const newProduct = new Product(product);

        
        await newProduct.save();
        res.status(201).json({
            success: true, 
            data: newProduct,
            message: "Product created successfully"
        });
    } catch (error) {
        console.log(`Error while creating product: ${error.message}`);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if(!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }    
        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.log(`Error while updating product: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: deletedProduct,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(`Error while deleting product: ${error.message}`);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}