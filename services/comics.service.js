// Modules npm
const axios = require('axios');
const mongoose = require('mongoose');
// Modules internes
const { createError } = require('../utils/createError');

const getAll = async () => {
    const response = await axios.get(`${process.env.MARVEL_API_URL}/comics?apiKey=${process.env.MARVEL_API_KEY}`);

    return response.data;
};

const getAllByCharacter = async data => {
    // Validation du characterId : n'est pas une string vide
    //  (si absent, la route /comics donc la fonction getAll sera appelée,
    //  mais si l'on a une chaîne vide on doit lever une exception)
    if (!data || !data.characterId || data.characterId.trim() === '') {
        createError(400, 'Character ID is mandatory');
    }

    const { characterId } = data;

    // Validation du characterId : objet mongoose valide
    if (!mongoose.Types.ObjectId.isValid(characterId)) {
        createError(400, 'Invalid character ID');
    }

    // Vérifier que le character existe dans la bdd
    const isCharacter = await axios.get(`${process.env.MARVEL_API_URL}/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`);

    if (!isCharacter.data) {
        createError(404, 'Character does not exist');
    }

    const response = await axios.get(`${process.env.MARVEL_API_URL}/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`);

    return response.data;
};

const getOneById = async data => {
    // Validation du comicId : n'est pas une chaîne vide
    //  (si absent, erreur "route not found" remontée par le routeur)
    if (!data || !data.comicId || data.comicId.trim() === '') {
        createError(400, 'Comic ID is mandatory');
    }

    const { comicId } = data;

    // Validation du comicId : objet mongoose valide
    if (!mongoose.Types.ObjectId.isValid(comicId)) {
        createError(400, 'Invalid comic ID');
    }

    const response = await axios.get(`${process.env.MARVEL_API_URL}/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`);

    // Vérifier que le comic existe en bdd
    // POUR INFO : dans ce cas, l'API semble répondre avec une erreur HTTP 400 plutôt qu'une donnée vide donc on ne peut pas arriver ici, mais je laisse quand même les lignes de code au cas où il y ait un changement futur
    // (contrairement à la réponse au même problème dans characters)
    if (!response.data) {
        createError(404, 'Comic not found');
    }

    return response.data;
};

module.exports = { getAll, getAllByCharacter, getOneById };
