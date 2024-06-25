const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required: true,
            maxlength: 32,
        },

        image:{
            type: String,
            requires:true,
        },

        itemName:{
            type: String,
            required: true,
        },

        price:{
            type: String,
            required: true,
        },

        quantity:{
            type: String,
            required: true,
        },

        subTotal:{
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Cart',cartSchema)