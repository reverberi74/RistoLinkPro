const Joi = require("joi");
const { Review } = require("../../db");
const { outError } = require("../../utilities/errors")

/**
 * Get all reviews
 * @param {Request} req
 * @param {Response} res
 */
const getReviews = async (req, res) => {
    const user = req.user;
    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    try {
        const { page, limit } = await schema.validateAsync(req.query);

        const reviews = await Review.paginate({ user }, { sort: { createdAt: -1 }, page, limit, lean: true, populate: [{ path: "author", select: "first_name last_name" }] });

        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        return outError(res, error);
    }
}

/**
 * Get review by id
 * @param {Request} req
 * @param {Response} res
 */
const getReviewById = async (req, res) => {
    const user = req.user;
    const review_id = req.params.review_id;

    try {
        const review = await Review.findOne({ user, _id: review_id }, null, { lean: true })
            .populate({ path: "author", select: "first_name last_name" });

        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        return outError(res, error);
    }
}

/**
 * Create new review
 * @param {Request} req
 * @param {Response} res
 */
const createReview = async (req, res) => {
    const author = req.user;
    const schema = Joi.object().keys({
        user: Joi.string().required(),
        content: Joi.string().required(),
        table: Joi.number().required(),
        rating: Joi.number().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const review = (await new Review({ author, ...data }).save()).toObject();

        return res.status(201).json(review);
    } catch (error) {
        console.log(error);
        return outError(res, error);
    }
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
}