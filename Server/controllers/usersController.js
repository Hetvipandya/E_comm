const Users = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllUsers = async(req,res) => {
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getAllUserIds = async (req, res) => {
    try {
        // Projection to return only the _id field
        const users = await Users.find({}, { _id: 1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async(req,res) => {
    try{
        const users = await Users.findById(req.params.id);
        if(!users) return res.status(404).json({message:'User not found'});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createUsers = async(req,res) => {
    const users = new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobileNumber:req.body.mobileNumber,
        email:req.body.email,
        password:req.body.password,
    });
    try{
        const newUsers = await users.save();
        res.status(201).json(newUsers);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};


exports.updateUsers = async (req, res) => {
    try {
        const usersId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(usersId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID
        const users = await Users.findById(usersId);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user properties
        users.firstName = req.body.firstName || users.firstName;
        users.lastName = req.body.lastName || users.lastName;
        users.mobileNumber = req.body.mobileNumber || users.mobileNumber;
        users.email = req.body.email || users.email;
        if (req.body.password) {
            users.password = req.body.password;
        };

        // Save the updated user
        const updatedUsers = await users.save();
        res.status(200).json(updatedUsers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteUsers = async (req, res) => {
    try {
        const usersId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(usersId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID and delete
        const users = await Users.findByIdAndDelete(userId);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};