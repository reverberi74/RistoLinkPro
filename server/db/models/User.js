const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "mod", "business"],
        required: true,
    },
    business_profile: {
        type: Schema.Types.ObjectId,
        ref: "BusinessProfile",
        required: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    }
}, { strict: true, timestamps: true, versionKey: false });

const User = model("User", UserSchema);

module.exports = User;