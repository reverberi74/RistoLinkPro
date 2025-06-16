const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { User, BusinessProfile } = require("../../db");
const { hashPassword } = require("../../utilities/auth");

/**
 * Create a new user
 * @param {Reques} req 
 * @param {Response} res 
 */
const createUser = async (req, res) => {
    const role = req.query.role || "user";

    if (role == "mod") return res.status(400).json({ message: "Not Authorized" });

    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        metadata: Joi.object().keys({
            business_name: Joi.string().required(),
            business_address: Joi.object().keys({
                address: Joi.string().required(),
                number: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                cap: Joi.string().required(),
            }),
            business_logo: Joi.string().optional(),
        }).optional(),
    });

    try {
        if (!role) return res.status(500).json({ message: "Internal Server Error" });

        const data = await schema.validateAsync(req.body);

        data.role = role;
        data.password = hashPassword(data.password);

        const { metadata, ...payload } = data;

        let user = (await new User(payload).save()).toObject();

        if (metadata && role === "business") {
            const profile = await new BusinessProfile({ user: user._id, ...metadata }).save();

            await User.updateOne({ _id: user._id }, { business_profile: profile._id });
        }

        if (metadata && role === "business") {
            user = await User.findOne({ _id: user._id }, "-password", { lean: true }).populate({ 
                path: "business_profile",
                select: "-createdAt -updatedAt"
            });
        }

        delete user.password;

        return res.status(201).json(user);
    } catch(err) {
        outError(res, err);
    }
}

module.exports = {
    createUser,
}