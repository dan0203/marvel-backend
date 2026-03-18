// Modules internes
const comicsService = require('../services/comics.service');

const getAll = async (req, res, next) => {
    try {
        const comics = await comicsService.getAll(req.query);

        return res.status(200).json(comics);
    } catch (error) {
        next(error);
    }
};

const getAllByCharacter = async (req, res, next) => {
    try {
        const data = req.params;
        const comics = await comicsService.getAllByCharacter(data);

        return res.status(200).json(comics);
    } catch (error) {
        next(error);
    }
};

const getOneById = async (req, res, next) => {
    try {
        const data = req.params;
        const comic = await comicsService.getOneById(data);

        return res.status(200).json(comic);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, getAllByCharacter, getOneById };
