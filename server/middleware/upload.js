/**
 * @file upload.js
 * @description Configura il middleware per l'upload delle immagini usando Multer.
 * Le immagini vengono salvate nella cartella `/assets` con un nome dinamico basato sul nome del piatto.
 */

const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Configurazione dello storage disk-based per Multer.
 * - La directory di destinazione è `/assets`, creata se non esiste.
 * - Il nome del file viene costruito usando il `name` del prodotto, normalizzato e con timestamp.
 */
const storage = multer.diskStorage({
    /**
     * Definisce la directory di destinazione per il salvataggio dei file.
     * Se la cartella `/assets` non esiste, viene creata automaticamente.
     *
     * @param {Request} req - La richiesta HTTP.
     * @param {Express.Multer.File} file - Il file ricevuto.
     * @param {Function} cb - Callback per specificare la destinazione.
     */
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../assets");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },

    /**
     * Genera il nome del file da salvare, basato sul nome del prodotto (`req.body.name`) e il timestamp corrente.
     * Il nome è formattato in minuscolo con trattini al posto degli spazi.
     *
     * @param {Request} req - La richiesta HTTP contenente `req.body.name`.
     * @param {Express.Multer.File} file - Il file ricevuto.
     * @param {Function} cb - Callback per specificare il nome del file.
     */
    filename: (req, file, cb) => {
        const productName = req.body.name?.replace(/\s+/g, "-").toLowerCase() || "image";
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        const fileName = `${productName}-${timestamp}${ext}`;
        cb(null, fileName);
    },
});

/**
 * Middleware per l'upload dei file, configurato con lo storage personalizzato.
 * Utilizzabile nei controller con `upload.single("image")` o simili.
 *
 * @type {multer.Multer}
 */
const upload = multer({ storage });

module.exports = { upload };