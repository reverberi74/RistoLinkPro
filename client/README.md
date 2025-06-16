client/
├── public/                  # Immagini e asset pubblici accessibili
│   └── images/              # Immagini visibili senza autenticazione
├── src/                     # Codice sorgente
│   ├── assets/              # Asset locali (es. SVG o immagini usate nei componenti)
│   ├── components/          # Componenti riutilizzabili
│   │   ├── shared/          # Componenti condivisi lato utente
│   │   ├── private/         # Componenti lato utente loggato
│   │   └── dashboard/       # Componenti lato business (ristoratore)
│   ├── pages/               # Pagine principali
│   │   ├── private/         # Rotte utente autenticato
│   │   └── dashboard/       # Rotte business dashboard
│   ├── layout/              # Layout pubblici e protetti (user/business)
│   ├── store/               # Redux store e slice
│   │   └── slices/          # Slice divise per dominio (auth, cart, ecc.)
│   ├── hooks/               # Hook personalizzati (es. useToast, useApi)
│   ├── config/              # Configurazioni generali (es. endpoint base)
│   └── utilities/           # Funzioni riutilizzabili (es. memory.js)
├── index.html               # Entry point HTML
├── tailwind.config.js       # Configurazione Tailwind CSS
├── vite.config.js           # Configurazione Vite
├── package.json             # Dipendenze lato client
└── README.md                # Documentazione progetto

