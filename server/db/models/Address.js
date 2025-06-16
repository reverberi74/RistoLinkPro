const { Schema, model } = require("mongoose");

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    cap: {
        type: String,
        required: true,
    },
    is_default: {
        type: Boolean,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Address = model("Address", AddressSchema);

module.exports = Address;