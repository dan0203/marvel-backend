// Modules npm
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Modules internes

// Création de l'app + middlewares globaux
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.all(/.*/, (req, res) => {
    res.status(404).json({ message: 'The route does not exist' });
});

// Middleware de gestion globale d'erreur
app.use((err, req, res, next) => {
    console.error(err.message);

    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
