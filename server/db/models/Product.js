const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    labels: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Label",
            required: true,
        }],
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
}, { strict: true, timestamps: true, versionKey: false });

const Product = model("Product", ProductSchema);

module.exports = Product;