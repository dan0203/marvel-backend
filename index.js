// Modules npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Modules internes
const charactersRoutes = require('./routes/characters.route');
const comicsRoutes = require('./routes/comics.route');

// Création de l'app + middlewares globaux
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/', charactersRoutes);
app.use('/', comicsRoutes);
app.all(/.*/, (req, res) => {
    res.status(404).json({ message: 'The route does not exist' });
});

// Middleware de gestion globale d'erreur
app.use((err, req, res, next) => {
    console.error(err.message);

    // Gestion des erreurs générées par l'application (throw error)
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    // Gestion des erreurs générées par axios
    if (err.response && err.response.status) {
        return res.status(err.response.status).json({
            message: err.response.data?.message || err.message,
        });
    }

    // Gestion des erreurs réseau
    if (err.request) {
        return res.status(503).json({ message: 'External service unavailable' });
    }

    return res.status(500).json({ message: 'Internal server error' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
