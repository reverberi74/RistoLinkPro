const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    table: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
}, { strict: true, timestamps: true, versionKey: false });

ReviewSchema.plugin(mongoosePaginate);

const Review = model("Review", ReviewSchema);

module.exports = Review;