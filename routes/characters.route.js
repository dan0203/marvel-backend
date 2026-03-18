// Modules npm
const express = require('express');
const router = express.Router();
// Modules internes
const charactersController = require('../controllers/characters.controller');

// Définition des routes
router.get('/characters', charactersController.getAll);
router.get('/character/:characterId', charactersController.getOneById);

module.exports = router;
