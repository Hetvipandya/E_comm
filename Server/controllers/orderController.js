const Order = require('../models/order');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllOrder = async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(checkouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrder = async(req,res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({message:'Item not found'});
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createOrder = async (req, res) => {
    const { userId,total,orderDate,status } = req.body;

    // Basic validation
    if (!userId || !total || !orderDate || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const order = new Order({
        userId,
        total,
        orderDate,
        status
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    const { id } = req.params; // Get ID from request parameters

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        // Find the checkout item by ID
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update checkout properties
        const {  userId,total,orderDate,status} = req.body;
        if (userId) order.userId = userId;
        if (total) order.total = total;
        if (orderDate) order.orderDate = orderDate;
        if (status) order.status = status;

        // Save the updated checkout item
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const itemId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        // Find the user by ID and delete
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};