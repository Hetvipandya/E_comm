const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
            maxlength: 32,
        },

        // orders:{
        //     type: String,
        //     required: true,
        //     maxlength: 32,
        // },

        total:{
            type: String,
            required: true,
            maxlength: 32,
        },

        orderDate:{
            type: String,
            required: true,
        },

        status:{
            type: String,
            required: true,
            maxlength: 32,
        },

    },
);

module.exports = mongoose.model('Order',orderSchema)