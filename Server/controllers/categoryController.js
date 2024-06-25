const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategory  = async(req,res) => {
    try{
        const category  = await Category.findById(req.params.id);
        if(!category) return res.status(404).json({message:'Category not found'});
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = new Category({
            categoryId: req.body.categoryId,
            categoryName: req.body.categoryName,
            image: req.body.image,
        });

        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.body._id; // Extracting category ID from _id

        // Check if category ID is provided
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        // Find the category by ID
        let category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Update category properties if they exist in the request body
        if (req.body.categoryId) category.categoryId = req.body.categoryId;
        if (req.body.categoryName) category.categoryName = req.body.categoryName;
        if (req.body.image) category.image = req.body.image;

        // Save the updated category
        category = await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        // Find the category by ID and delete
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};