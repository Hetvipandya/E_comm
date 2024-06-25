const Products = require('../models/products');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.find(); 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
       const { categoryId } = req.query; // Assuming you want to filter by username
        let query = {categoryId: 1 }; // Default empty query

        if (categoryId) {
            query.categoryId = 1; // Add username condition to query if provided
        }

        const products = await Products.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductsId = async (req, res) => {
    try {
       const { categoryId } = req.query; // Assuming you want to filter by username
        let query = {categoryId: 2 }; // Default empty query

        if (categoryId) {
            query.categoryId = 2; // Add username condition to query if provided
        }

        const products = await Products.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createProducts = async (req, res) => {

    try {
        console.log(req.body)
        const products = new Products({
            categoryId: req.body.categoryId,
            itemId: req.body.itemId,
            image: req.body.image,
            itemName: req.body.itemName,
            price: req.body.price,
        });
        const newProducts = await products.save(products);
        res.status(201).json(newProducts);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProducts = async (req, res) => {
    try {
        const categoryId = req.body.id;

        // Log the productId and its type
        // console.log('Received productId:', categoryId);
        // console.log('Type of productId:', typeof categoryId);

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Find the product by ID
        let product = await Products.findById(categoryId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product properties
        product.categoryId = req.body.categoryId || product.categoryId;
        product.itemId = req.body.itemId || product.itemId;
        product.image = req.body.image || product.image;
        product.itemName = req.body.itemName || product.itemName;
        product.price = req.body.price || product.price;

        // Save the updated product
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProducts = async (req, res) => {
    try {
        const productId = req.body.id;

        // Log the productId and its type for debugging purposes
        // console.log('Received productId:', productId);
        // console.log('Type of productId:', typeof productId);

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Find the product by ID and delete
        const product = await Products.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};