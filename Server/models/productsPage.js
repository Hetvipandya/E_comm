const mongoose = require("mongoose");

const productsPageSchema = new mongoose.Schema(
    {
        categoryId:{
            type: String,
            required: true,
            maxlength: 32,
        },

        itemId:{
            type: String,
            required: true,
            maxlength: 32,
        },

        image:{
            type: String,
        },

        itemName:{
            type: String,
            required: true,
        },

        price:{
            type:String,
            required: true,
        },
    },
);

module.exports = mongoose.model('ProductsPage',productsPageSchema)