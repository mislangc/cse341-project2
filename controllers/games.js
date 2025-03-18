const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getGames = async (req, res) => {
    //#swagger.tags=['Games']
    const result = await mongodb.getDatabase().db().collection('games').find();
    result.toArray().then((accounts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    });
}

const getOneGame = async (req, res) => {
    //#swagger.tags=['Games']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('games').find({ _id: contactId });
    result.toArray().then((accounts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    });
}

const createGame = async (req, res) => {
    //#swagger.tags=['Games']
    const contact = {
        name: req.body.name,
        publishedYear: req.body.publishedYear,
        genres: req.body.genres,
        developer: req.body.developer,
        progLanguage: req.body.progLanguage,
        version: req.body.version,
        ageRating: req.body.ageRating
    };
    const response = await mongodb.getDatabase().db().collection('games').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the game.')
    }
};

const updateGame = async (req, res) => {
    //#swagger.tags=['Games']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        publishedYear: req.body.publishedYear,
        genres: req.body.genres,
        developer: req.body.developer,
        progLanguage: req.body.progLanguage,
        version: req.body.version,
        ageRating: req.body.ageRating
    };
    const response = await mongodb.getDatabase().db().collection('games').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the game or the id given does not exist.')
    }
};

const deleteGame = async (req, res) => {
    //#swagger.tags=['Games']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('games').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the game or the game has already been deleted.')
    }
};

module.exports = {
    getGames,
    getOneGame,
    createGame,
    updateGame,
    deleteGame
};