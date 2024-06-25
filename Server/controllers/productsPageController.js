const ProductsPage = require('../models/productsPage');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllProductsPage = async (req, res) => {
    try {
        const productsPages = await ProductsPage.find(); 
        res.status(200).json(productsPages); 
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getProductsPage = async (req, res) => {
//     try {
//         //console.log('categoryId:',categoryId)
//        const { categoryId } = req.query; // Assuming you want to filter by username
//         let query = {categoryId: categoryId  }; // Default empty query
//         console.log('Received categoryId:', categoryId); 
//         // if (categoryId) {
//         //     query.categoryId = 1; // Add username condition to query if provided
//         // }
        
//         const ProductsPage = await ProductsPage.find(query);
//         res.json(ProductsPage);
       
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getProductsPage = async (req, res) => {
//     try {
//         const { categoryId } = req.query;
//         let query = {}; // Default empty query

//         if (categoryId) {
//             query.categoryId = categoryId; // Add categoryId condition to query if provided
//         }
        
//         //console.log('Received categoryId:', categoryId); // Log the categoryId for debugging
        
//         const productsPage = await ProductsPage.find(query);
//         res.json(productsPage);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getProductsPage = async (req, res) => {
    try {
        const { categoryId } = req.query;
        let query = {}; // Default empty query

        if (categoryId) {
            query.categoryId = categoryId; // Add categoryId condition to query if provided
        }
        
        // Fetch and log all category IDs
        const categories = await Category.find({}, 'id'); // Adjust the field if your ID field is different
        const categoryIds = categories.map(category => category.id);
        //console.log('All category IDs:', categoryIds);
        
        // Fetch and return the products based on the query
        const productsPage = await ProductsPage.find(query);
        res.json(productsPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.createProductsPage = async (req, res) => {
    try {
        const newProductsPage = new ProductsPage({
            categoryId: req.body.categoryId,
            itemId: req.body.itemId,
            image: req.body.image,
            itemName: req.body.itemName,
            price: req.body.price,
        });

        // Save the newProductsPage instance to the database
        const savedProductsPage = await newProductsPage.save();
        res.status(201).json(savedProductsPage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProductsPage = async (req, res) => {
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
        let ProductsPage = await ProductsPage.findById(categoryId);
        if (!ProductsPage) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product properties
        ProductsPage.categoryId = req.body.categoryId || ProductsPage.categoryId;
        ProductsPage.itemId = req.body.itemId || ProductsPage.itemId;
        ProductsPage.image = req.body.image || ProductsPage.image;
        ProductsPage.itemName = req.body.itemName || ProductsPage.itemName;
        ProductsPage.price = req.body.price || ProductsPage.price;

        // Save the updated product
        const updatedProductsPage = await product.save();
        res.status(200).json(updatedProductsPage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProductsPage = async (req, res) => {
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
        const ProductsPage = await ProductsPage.findByIdAndDelete(productId);
        if (!ProductsPage) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};