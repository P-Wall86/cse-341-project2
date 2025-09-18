const router = require('express').Router();

router.get ('/', (req, res) => {
    res.send('Te manda saludos el chancho peludo.');
});

module.exports = router;