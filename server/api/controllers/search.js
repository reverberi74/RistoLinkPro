const Joi = require('joi');
const { outError } = require('../../utilities/errors');
const { Category, Product } = require('../../db');

/**
 * Search for categories and products by name or category match
 * @param {Request} req 
 * @param {Response} res 
 * @permission User
 */
const searchCateogriesAndProducts = async (req, res) => {
  const schema = Joi.object().keys({
    u: Joi.string().required(),
    q: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.query);
    const { u, q } = data;

    // Trova tutte le categorie che corrispondono alla query
    const matchedCategories = await Category.find(
      { user: u, name: { $regex: q, $options: 'i' } },
      null,
      { lean: true }
    );

    const categoryIds = matchedCategories.map(cat => cat._id);

    // Trova i prodotti che corrispondono per nome, per descrizione o che appartengono a una categoria trovata
    const products = await Product.find(
      {
        user: u,
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { category: { $in: categoryIds } }
        ]
      },
      null,
      { lean: true }
    )
      .populate('category')
      .populate('labels');

    const status_code = matchedCategories.length === 0 && products.length === 0 ? 404 : 200;

    return res.status(status_code).json({ categories: matchedCategories, products });
  } catch (err) {
    outError(res, err);
  }
};

module.exports = {
  searchCateogriesAndProducts,
};