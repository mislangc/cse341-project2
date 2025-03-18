const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');
const validation = require('../middleware/validate');

router.get('/', 
    accountsController.getAccounts);

router.get('/:id', 
    validation.passId, 
    accountsController.getOneAccount);

router.post('/', 
    validation.passAccounts, 
    accountsController.createAccount);

router.put('/:id', 
    validation.passId, 
    validation.passAccounts, 
    accountsController.updateAccount);
    
router.delete('/:id', 
    validation.passId, 
    accountsController.deleteAccount);

module.exports = router;