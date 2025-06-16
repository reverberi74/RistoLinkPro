/**
 * @file auth.js
 * @description Middleware per l'autenticazione e l'autorizzazione degli utenti tramite JWT.
 * Verifica la presenza e validità del token, controlla il ruolo dell'utente se richiesto,
 * carica i dati dell'utente dal database e li assegna a `req.user`.
 */
const { verifyUserToken } = require("../utilities/auth");
const { outError } = require("../utilities/errors");
const { User } = require("../db");

/**
 * Middleware per autenticare un utente tramite token JWT e opzionalmente autorizzare in base al ruolo.
 *
 * @function authUser
 * @param {Array<string>} [role=[]] - Array di ruoli autorizzati (es. ['user', 'business']). Se vuoto, accetta tutti.
 * @returns {Function} Middleware Express che autentica e autorizza l'utente.
 *
 * @example
 * // Solo utenti loggati
 * router.get("/me", authUser(), handler);
 *
 * // Solo utenti con ruolo "business"
 * router.post("/products", authUser(["business"]), handler);
 */

const authUser = (role = []) => async (req, res, next) => {
    const bearerToken = req.headers.authorization || req.headers["authorization"] || req.query.token;

    if (!bearerToken) return res.status(403).json({ message: "Not Authorized 1" });

    const token = bearerToken.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Not Authorized 2" });   

    try {
        const decoded = verifyUserToken(token);

        if (!decoded) return res.status(403).json({ message: "Not Authorized 3" });

        if (role.length > 0 && !role.includes(decoded.role)) return res.status(403).json({ message: "Not Authorized 4" });;

        const user = await User.findOne({ _id: decoded._id, role: decoded.role, is_active: true }, "-password", { lean: true }).populate({ 
            path: "business_profile",
            select: "-createdAt -updatedAt"
        });

        if (user == null) return res.status(403).json({ message: "Not Authorized 5" });

        req.user = user;

        return next();
    } catch(err) {
        outError(res, err, { code: 403, message: "Not Authorized 6" });
    }
}

module.exports = {
    authUser,
}