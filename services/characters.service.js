// Modules npm
const axios = require('axios');
const mongoose = require('mongoose');
// Modules internes
const { createError } = require('../utils/createError');

const getAll = async () => {
    const response = await axios.get(`${process.env.MARVEL_API_URL}/characters?apiKey=${process.env.MARVEL_API_KEY}`);

    return response.data;
};

const getOneById = async data => {
    // Validation du characterId : n'est pas une chaîne vide
    //  (si absent, erreur "route not found" remontée par le routeur)
    if (!data || !data.characterId || data.characterId.trim() === '') {
        createError(400, 'Character ID is mandatory');
    }

    const { characterId } = data;

    // Validation du characterId : objet mongoose valide
    if (!mongoose.Types.ObjectId.isValid(characterId)) {
        createError(400, 'Invalid character ID');
    }

    const response = await axios.get(`${process.env.MARVEL_API_URL}/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`);

    // Vérifier que le character existe en bdd
    // POUR INFO : dans ce cas, l'API semble répondre avec une donnée vide plutôt qu'une erreur donc on peut arriver ici
    // (contrairement à la réponse au même problème dans comics)
    if (!response.data) {
        createError(404, 'Character not found');
    }

    return response.data;
};

module.exports = { getAll, getOneById };
