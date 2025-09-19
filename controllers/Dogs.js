const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Dogs').find();
    result.toArray().then((Dogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Dogs);
    });
}

const getOne = async (req, res) => {
    const dogID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Dogs').find({ _id: dogID });
    result.toArray().then((Dogs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Dogs[0]);
    });
}
const createDog = async (req, res) => {
    const dog = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        weightKg: req.body.weightKg,
        vaccinated: req.body.vaccinated,
        microchipped: req.body.microchipped,
        owner: {
            name: req.body.owner.name,
            phone: req.body.owner.phone
        }
    };

    const response = await mongodb.getDatabase().db().collection('Dogs').insertOne(dog);

    if (response.acknowledged) {
        res.status(201).json({ insertedId: response.insertedId });
    } else {
        res.status(500).json('Some error occurred while creating the Dog.');
    }
};

const updateDog = async (req, res) => {
    const DogId = new ObjectId(req.params.id);
    const dog = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        weightKg: req.body.weightKg,
        vaccinated: req.body.vaccinated,
        microchipped: req.body.microchipped,
        owner: {
            name: req.body.owner.name,
            phone: req.body.owner.phone
        }
    };

    const response = await mongodb.getDatabase().db().collection('Dogs').replaceOne(
        { _id: DogId },
        dog
    );

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json('Dog not found or no changes applied.');
    }
};

const deleteDog = async (req, res) => {
    const DogId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Dogs').deleteOne({ _id: DogId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json('Dog not found.');
    }
};


module.exports = {
    getAll,
    getOne,
    createDog,
    updateDog,
    deleteDog
};