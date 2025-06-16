const { Schema, model } = require("mongoose");

const LabelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
}, { strict: true, timestamps: true, versionKey: false });

const Label = model("Label", LabelSchema);

module.exports = Label;