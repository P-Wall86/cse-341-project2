const router = require('express').Router();

router.get ('/', (req, res) => {
    res.send('Yo.');
});

router.use('/Cats', require('./Cats'));
router.use('/Dogs', require('./Dogs'));

module.exports = router;