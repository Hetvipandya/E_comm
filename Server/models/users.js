const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            maxlength: 32,
        },

        lastName:{
            type: String,
            required: true,
            maxlength: 32,
        },

        mobileNumber:{
            type: Number,
            required: true,
            maxlength: 10,
        },

        email:{
            type: String,
            required: true,
            trim: true,
            index: {unique:true},
        },

        password:{
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Users',usersSchema)