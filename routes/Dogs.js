const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validate = require('../middleware/validator').validate;
const  {IsAuthenticated} = require ("../middleware/authenticate");

const dogsController = require('../controllers/Dogs');

router.get('/', dogsController.getAll);

router.get(
    '/:id',
    [param('id').isMongoId().withMessage('Invalid ID format.')],
    validate,
    dogsController.getOne
);

router.post(
    '/',
    IsAuthenticated,
    [
        body('name').notEmpty().withMessage('A name is required'),
        body('breed').notEmpty().withMessage('Breed is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
        body('weightKg').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
        body('vaccinated').isBoolean().withMessage('Vaccinated must be true or false'),
        body('microchipped').isBoolean().withMessage('Microchipped must be true or false'),
        body('owner.name').notEmpty().withMessage("The owner's name is required"),
        body('owner.phone').matches(/^\d{3}-\d{4}$/).withMessage("The owner's phone number must be in the format XXX-XXXX").notEmpty().withMessage("The owner's phone number is required")
    ],
    validate,
    dogsController.createDog
);

router.put(
    '/:id',
    IsAuthenticated,
    [
        body('name').notEmpty().withMessage('A name is required'),
        body('breed').notEmpty().withMessage('Breed is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
        body('weightKg').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
        body('vaccinated').isBoolean().withMessage('Vaccinated must be true or false'),
        body('microchipped').isBoolean().withMessage('Microchipped must be true or false'),
        body('owner.name').notEmpty().withMessage("The owner's name is required"),
        body('owner.phone').matches(/^\d{3}-\d{4}$/).withMessage("The owner's phone number must be in the format XXX-XXXX").notEmpty().withMessage("The owner's phone number is required.")
    ],
    validate,
    dogsController.updateDog
);

router.delete(
    '/:id',
    IsAuthenticated,
    [param('id').isMongoId().withMessage('Invalid ID format.')],
    validate,
    dogsController.deleteDog
);

module.exports = router;