/**
 * @fileoverview Controller per la gestione dei prodotti:
 * - Recupero dei prodotti (per categoria o tutti)
 * - Creazione di un nuovo prodotto (upload o duplicazione immagine)
 * - Modifica di un prodotto esistente
 * - Eliminazione di un prodotto e relativa immagine
 */

const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Product } = require("../../db");
const fs = require("fs");
const path = require("path");

/**
 * Get all prodycts
 * @param {Request} req
 * @param {Response} res
 * @permission Business
 */
const mongoose = require("mongoose");

/**
 * Recupera tutti i prodotti.
 * Se viene fornito un category_id, filtra i prodotti per categoria.
 *
 * @param {import("express").Request} req - Richiesta HTTP
 * @param {import("express").Response} res - Risposta HTTP
 * @returns {Promise<void>}
 * @permission Business
 */

const getAllProducts = async (req, res) => {
  const categoryId = req.params.category_id;

  try {
    let query = {};

    if (categoryId && categoryId !== 'all') {
      // Controlla che sia un ObjectId valido prima di usarlo
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: "ID categoria non valido" });
      }
      query.category = categoryId;
    }

    const products = await Product.find(query, null, {
      lean: true,
      sort: { createdAt: -1 },
    })
      .populate("category")
      .populate("labels");

    return res.status(201).json(products);
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Crea un nuovo prodotto.
 * - Se è presente `req.file`, salva immagine tramite upload.
 * - Se `req.body.image` è un path esistente (da duplicazione), copia l'immagine.
 *
 * @param {import("express").Request} req - Richiesta HTTP
 * @param {import("express").Response} res - Risposta HTTP
 * @returns {Promise<void>}
 * @permission Business
 */
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    let imagePath = "";

    if (req.file) {
      // Immagine caricata tramite form
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      imagePath = `${baseUrl}/assets/${req.file.filename}`;
    } else if (image && image.startsWith("/assets/")) {
      // Immagine duplicata: copiamo il file fisico
      const originalPath = path.join(__dirname, "../../assets", path.basename(image));
      const ext = path.extname(image);
      const uniqueName = `copy-${Date.now()}${ext}`;
      const newPath = path.join(__dirname, "../../assets", uniqueName);

      if (fs.existsSync(originalPath)) {
        fs.copyFileSync(originalPath, newPath);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        imagePath = `${baseUrl}/assets/${uniqueName}`;
      } else {
        console.warn("Immagine da duplicare non trovata:", originalPath);
      }
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: imagePath,
      user: req.user._id,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Errore nella creazione del prodotto:", error);
    res.status(500).json({ error: "Errore durante la creazione del prodotto" });
  }
};
/**
 * Aggiorna un prodotto esistente.
 * Se viene fornita una nuova immagine tramite `req.file`, aggiorna anche il campo immagine.
 *
 * @param {import("express").Request} req - Richiesta HTTP
 * @param {import("express").Response} res - Risposta HTTP
 * @returns {Promise<void>}
 * @permission Business
 */
const updateProductById = async (req, res) => {
  const user = req.user;
  const _id = req.params.product_id;

  const schema = Joi.object().keys({
    category: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    image: Joi.string().optional(), // facoltativa
  });

  try {
    let data = await schema.validateAsync(req.body);

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imagePath = `${baseUrl}/assets/${req.file.filename}`;
      data.image = imagePath;
    }

    await Product.updateOne({ user, _id }, { ...data });

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Elimina un prodotto e la sua immagine associata (se presente).
 * - Controlla che il prodotto appartenga all'utente
 * - Rimuove immagine solo se salvata nella cartella `/assets`
 *
 * @param {import("express").Request} req - Richiesta HTTP
 * @param {import("express").Response} res - Risposta HTTP
 * @returns {Promise<void>}
 * @permission Business
 */
const deleteProductById = async (req, res) => {
  const user = req.user;
  const _id = req.params.product_id;

  try {
    // 1. Trova il prodotto per accedere al campo immagine
    const product = await Product.findOne({ user, _id });
    if (!product) {
      return res.status(404).json({ error: "Prodotto non trovato" });
    }

    // 2. Se ha un'immagine associata e salvata in /assets, rimuovila dal file system
    if (product.image && product.image.includes("/assets/")) {
      const relativePath = product.image.split("/assets/")[1]; // es: "image.jpg" o "folder/image.jpg"
      if (relativePath) {
        const imagePath = path.join(__dirname, "../../assets", relativePath);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Immagine eliminata:", imagePath);
        } else {
          console.warn("File immagine non trovato:", imagePath);
        }
      }
    }

    // 3. Elimina il prodotto dal DB
    await Product.deleteOne({ user, _id });

    return res.status(200).json({ message: "Prodotto e immagine eliminati con successo" });
  } catch (err) {
    console.error("Errore durante l'eliminazione:", err);
    outError(res, err);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
};