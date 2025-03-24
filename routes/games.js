const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/',
    gamesController.getGames);

router.get('/:id',
    validation.passId,
    gamesController.getOneGame);

router.post('/',
    isAuthenticated,
    validation.passGames,
    gamesController.createGame);

router.put('/:id',
    isAuthenticated,
    validation.passId,
    validation.passGames,
    gamesController.updateGame);

router.delete('/:id',
    isAuthenticated,
    validation.passId,
    gamesController.deleteGame);

module.exports = router;