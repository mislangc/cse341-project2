const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World')
});

router.use('/accounts', require('./accounts'));

router.use('/games', require('./games'));

module.exports = router;