// Modules npm
const axios = require('axios');
const mongoose = require('mongoose');

const getAll = async () => {
    const response = await axios.get(`${process.env.MARVEL_API_URL}/characters?apiKey=${process.env.MARVEL_API_KEY}`);

    return response.data;
};

const getOneById = async data => {
    // Validation du characterId : n'est pas une string vide
    //  si absent, la route getAll sera appelée, mais si l'on a une chaîne vide on doit lever une exception
    if (!data || !data.characterId || data.characterId.trim() === '') {
        const error = new Error('Character ID is mandatory');
        error.status = 404;
        throw error;
    }

    const { characterId } = data;

    // Validation du characterId : objet mongoose valide
    if (!mongoose.Types.ObjectId.isValid(characterId)) {
        const error = new Error('Invalid character ID');
        error.status = 404;
        throw error;
    }

    const response = await axios.get(`${process.env.MARVEL_API_URL}/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`);

    // Vérifier que le character existe en bdd
    if (!response.data) {
        const error = new Error('Character not found');
        error.status = 404;
        throw error;
    }

    return response.data;
};

module.exports = { getAll, getOneById };
