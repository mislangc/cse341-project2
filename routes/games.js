const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const validation = require('../middleware/validate');

router.get('/',
    gamesController.getGames);

router.get('/:id',
    validation.passId,
    gamesController.getOneGame);

router.post('/',
    validation.passGames,
    gamesController.createGame);

router.put('/:id',
    validation.passId,
    validation.passGames,
    gamesController.updateGame);

router.delete('/:id',
    validation.passId,
    gamesController.deleteGame);

module.exports = router;