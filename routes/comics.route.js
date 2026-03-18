// Modules npm
const express = require('express');
const router = express.Router();
// Modules internes
const comicsController = require('../controllers/comics.controller');

// Définition des routes
router.get('/comics', comicsController.getAll);
router.get('/comics/:characterId', comicsController.getAllByCharacter);
router.get('/comic/:comicId', comicsController.getOneById);

module.exports = router;
