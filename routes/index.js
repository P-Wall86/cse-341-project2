const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.send('Yo.');
});

router.use('/Cats', require('./Cats'));
router.use('/Dogs', require('./Dogs'));

router.get('/login', passport.authenticate('github'));

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;