# project-7-2
server/
├── api/                       # API principali del progetto
│   ├── controllers/          # Logica dei controller (CRUD categories, products, ecc.)
│   ├── routes/               # Routing REST API (collegati ai controller)
│   └── index.js              # Entry point delle API
├── auth/                     # Autenticazione utente e business
│   ├── controllers/          # Controller login/registrazione
│   ├── routes/               # Rotte per login/signup
│   └── index.js              # Entry point autenticazione
├── db/                       # Connessione e modelli MongoDB
│   ├── index.js              # Configurazione e connessione a MongoDB
│   └── models/               # Modelli Mongoose (User, Product, Review, ecc.)
├── middleware/               # Middleware per autorizzazione e autenticazione
│   └── auth.js               # Middleware token JWT
├── utilities/                # Funzioni di utilità (gestione errori, logging)
│   ├── auth.js
│   ├── errors.js
│   ├── logs.js
│   └── options.js
├── assets/                   # Immagini statiche associate ai piatti/categorie
├── index.js                  # Entry point del server Express
├── package.json              # Dipendenze lato server
├── .env                      # Variabili di ambiente (non tracciato in Git)
└── README.md                  