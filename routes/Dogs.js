const express = require('express');
const router = express.Router();

const dogsController = require('../controllers/Dogs');

router.get('/', dogsController.getAll);

router.get('/:id', dogsController.getOne);

router.post('/', dogsController.createDog);

router.put('/:id', dogsController.updateDog);

router.delete('/:id', dogsController.deleteDog);

module.exports = router;