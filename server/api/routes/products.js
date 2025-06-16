/**
 * @fileoverview Route handler per la gestione dei prodotti lato business.
 * Gestisce operazioni CRUD sui prodotti e include il supporto per l'upload di immagini.
 */

const express = require("express");
const { authUser } = require("../../middleware/auth");
const { getAllProducts, createProduct, updateProductById, deleteProductById } = require("../controllers/products");
const { upload } = require("../../middleware/upload");

const app = express.Router();

/**
 * @route GET /api/products
 * @group Prodotti - Recupera tutti i prodotti (tutte le categorie)
 * @middleware authUser() - Richiede autenticazione
 * @returns {Product[]} 200 - Lista di prodotti
 * @returns {Error} 401 - Non autorizzato
 */
app.get("/", authUser(), (req, res, next) => {
    req.params.category_id = "all"; // Simula una categoria "all"
    next();
}, getAllProducts);

/**
 * @route GET /api/products/:category_id
 * @group Prodotti - Recupera prodotti per categoria specifica
 * @middleware authUser() - Richiede autenticazione
 * @param {string} category_id.path.required - ID della categoria
 * @returns {Product[]} 200 - Lista di prodotti per categoria
 * @returns {Error} 400 - ID non valido
 * @returns {Error} 401 - Non autorizzato
 */
app.get("/:category_id", authUser(), getAllProducts);

/**
 * @route POST /api/products
 * @group Prodotti - Crea un nuovo prodotto
 * @middleware authUser(["business"]) - Solo utenti business
 * @middleware upload.single("image") - Gestione file immagine
 * @param {Product.model} body.body.required - Dati del prodotto
 * @returns {Product.model} 201 - Prodotto creato
 * @returns {Error} 400 - Dati non validi
 * @returns {Error} 500 - Errore interno
 */
app.post("/", authUser(["business"]), upload.single("image"), createProduct);

/**
 * @route PUT /api/products/:product_id
 * @group Prodotti - Aggiorna un prodotto esistente
 * @middleware authUser(["business"]) - Solo utenti business
 * @middleware upload.single("image") - Upload immagine opzionale
 * @param {string} product_id.path.required - ID del prodotto da aggiornare
 * @returns {string} 200 - Messaggio di conferma
 * @returns {Error} 404 - Prodotto non trovato
 * @returns {Error} 500 - Errore durante l’aggiornamento
 */
app.put("/:product_id", authUser(["business"]), upload.single("image"), updateProductById);

/**
 * @route DELETE /api/products/:product_id
 * @group Prodotti - Elimina un prodotto
 * @middleware authUser(["business"]) - Solo utenti business
 * @param {string} product_id.path.required - ID del prodotto da eliminare
 * @returns {string} 200 - Messaggio di conferma
 * @returns {Error} 404 - Prodotto non trovato
 * @returns {Error} 500 - Errore durante l’eliminazione
 */
app.delete("/:product_id", authUser(["business"]), deleteProductById);

module.exports = app;