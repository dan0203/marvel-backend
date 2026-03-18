// Modules npm
const express = require('express');
const router = express.Router();
// Modules internes
const charactersController = require('../controllers/characters.controller');

// Définition des routes
router.get('/', charactersController.getAll);
router.get('/:characterId', charactersController.getOneById);

module.exports = router;
