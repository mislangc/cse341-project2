const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',
    accountsController.getAccounts);

router.get('/:id',
    validation.passId,
    accountsController.getOneAccount);

router.post('/',
    isAuthenticated,
    validation.passAccounts,
    accountsController.createAccount);

router.put('/:id',
    isAuthenticated,
    validation.passId,
    validation.passAccounts,
    accountsController.updateAccount);

router.delete('/:id',
    isAuthenticated,
    validation.passId,
    accountsController.deleteAccount);

module.exports = router;