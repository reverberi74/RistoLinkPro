const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Category } = require("../../db");

/**
 * Get all categories
 * @param {Request} req 
 * @param {Response} res 
 * @permission Business
 */
const getAllCategories = async (req, res) => {
    const user = req.params.business_id;

    try {
        const categories = await Category.find({ user }, null, { lean: true }).sort({ order: 1, name: 1 });

        return res.status(201).json(categories);
    } catch (err) {
        outError(res, err);
    }
}

/**
 * Get category by id
 * @param {Request} req 
 * @param {Response} res 
 * @permission Business
 */
const getCategoryById = async (req, res) => {
    const user = req.params.business_id;
    const _id = req.params.category_id;

    try {
        const category = await Category.find({ _id, user }, null, { lean: true });

        return res.status(201).json(category);
    } catch (err) {
        outError(res, err);
    }
}

/**
 * Create a new category
 * @param {Request} req 
 * @param {Response} res 
 * @permission Business
 */
const createCategory = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const category = (await new Category({ user, ...data }).save()).toObject();

        return res.status(201).json(category);
    } catch (err) {
        outError(res, err);
    }
}

/**
 * Update a category
 * @param {Request} req 
 * @param {Response} res 
 * @permission Business
 */
const updateCategoryById = async (req, res) => {
    const user = req.user;
    const _id = req.params.category_id;

    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        image: Joi.string().optional(),
        order: Joi.number().integer().min(0).optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Category.updateOne({ user, _id }, { ...data });

        return res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
        outError(res, err);
    }
}

/**
 * Delete a category
 * @param {Request} req 
 * @param {Response} res 
 * @permission Business
 */
const deleteCategoryById = async (req, res) => {
    const user = req.user;
    const _id = req.params.category_id;

    try {
        await Category.deleteOne({ user, _id });

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        outError(res, err);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
}