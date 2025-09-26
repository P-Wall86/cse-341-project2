const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validate = require('../middleware/validator').validate;
const  {IsAuthenticated} = require ("../middleware/authenticate");

const catsController = require('../controllers/Cats');

router.get('/', catsController.getAll);

router.get(
    '/:id',
    [param('id').isMongoId().withMessage('Invalid ID format.')],
    validate,
    catsController.getOne
);

router.post(
    '/',
    IsAuthenticated,
    [
        body('name').notEmpty().withMessage('A name is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
        body('color').notEmpty().withMessage('Color is required'),
        body('indoor').isBoolean().withMessage('Field must be true or false'),
    ],
    validate,
    catsController.createCat
);

router.put(
    '/:id',
    IsAuthenticated,
    [
        body('name').notEmpty().withMessage('A name is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
        body('color').notEmpty().withMessage('Color is required'),
        body('indoor').isBoolean().withMessage('Field must be true or false'),
    ],
    validate,
    catsController.updateCat
);

router.delete(
    '/:id',
    IsAuthenticated,
    [param('id').isMongoId().withMessage('Invalid ID format.')],
    validate,
    catsController.deleteCat
);

module.exports = router;