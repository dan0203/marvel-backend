// Modules internes
const charactersService = require('../services/characters.service');

const getAll = async (req, res) => {
    try {
        const characters = await charactersService.getAll();

        return res.status(200).json(characters);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal service error');
    }
};

const getOneById = async (req, res) => {
    try {
        const data = req.params;
        const character = await charactersService.getOneById(data);

        return res.status(200).json(character);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Internal service error');
    }
};

module.exports = { getAll, getOneById };
