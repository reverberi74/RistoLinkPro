const { Schema, model } = require("mongoose");

const BusinessProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    business_name: {
        type: String,
        required: true
    },
    business_address: {
        type: {
            address: String,
            number: String,
            state: String,
            cap: String,
            city: String,
        }
    },
    business_logo: {
        type: String,
        required: false
    },
}, { strict: true, timestamps: true, versionKey: false });

const BusinessProfile = model("BusinessProfile", BusinessProfileSchema);

module.exports = BusinessProfile;