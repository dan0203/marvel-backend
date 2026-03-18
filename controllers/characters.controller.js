// Modules internes
const charactersService = require('../services/characters.service');

const getAll = async (req, res, next) => {
    try {
        const characters = await charactersService.getAll();

        return res.status(200).json(characters);
    } catch (error) {
        next(error);
    }
};

const getOneById = async (req, res, next) => {
    try {
        const data = req.params;
        const character = await charactersService.getOneById(data);

        return res.status(200).json(character);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getOneById };
