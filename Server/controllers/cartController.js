const Cart = require('../models/cart');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getCart = async(req,res) => {
    try{
        const cart = await Cart.findById(req.params.id);
        if(!cart) return res.status(404).json({message:'Cart not found'});
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createCart = async (req, res) => {
    const { userId,image, itemName, price, quantity, subTotal } = req.body;

    // Basic validation
    if (!userId ||!image|| !itemName || !price || !quantity || !subTotal) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const cart = new Cart({
        userId,
        image,
        itemName,
        price,
        quantity,
        subTotal
    });

    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// exports.updateCart = async (req, res) => {
//     try {
//         const cartId = req.body.id; 

//         // Validate ObjectId
//         if (!mongoose.Types.ObjectId.isValid(cartId)) {
//             return res.status(400).json({ message: "Invalid cart ID" });
//         }

//         // Find the cart item by ID
//         let cart = await Cart.findById(cartId);

//         if (!cart) {
//             return res.status(404).json({ message: "Cart item not found" });
//         }

//         // Update cart properties
//         cart.userId = req.body.userId || cart.userId;
//         cart.image = req.body.image || cart.image;
//         cart.itemName = req.body.itemName || cart.itemName; // Corrected typo in itemName
//         cart.price = req.body.price || cart.price;
//         cart.quantity = req.body.quantity || cart.quantity;
//         cart.subTotal = req.body.subTotal || cart.subTotal;

//         // Save the updated cart
//         const updatedCart = await cart.save();

//         res.status(200).json(updatedCart);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.updateCart = async (req, res) => {
    try {
        const cartId = req.body.id; 

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({ message: "Invalid cart ID" });
        }

        // Find the cart item by ID
        let cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update cart properties
        cart.userId = req.body.userId || cart.userId;
        cart.image = req.body.image || cart.image;
        cart.itemName = req.body.itemName || cart.itemName; // Corrected typo in itemName
        cart.price = req.body.price || cart.price;
        cart.quantity = req.body.quantity || cart.quantity;

        // Calculate subTotal based on updated price and quantity
        cart.subTotal = (cart.price || 0) * (cart.quantity || 1);

        // Save the updated cart
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.deleteCart = async (req, res) => {
    try {
        const id = req.body.id;
        //console.log("id:",id)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid cart ID" });
        }

        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
