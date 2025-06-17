const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    order: {
        type: Number, // 🔧 Aggiunto campo opzionale per ordinamento
        default: null
    }
}, { strict: true, timestamps: true, versionKey: false });

module.exports = model("Category", CategorySchema);
