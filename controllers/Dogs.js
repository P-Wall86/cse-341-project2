const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('Dogs')
            .find();
        const Dogs = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Dogs);

    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const DogID = req.params.id;

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('Dogs')
            .find({ _id: new ObjectId(DogID) });
        const Dogs = await result.toArray();

        if (!Dogs[0]) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        res.status(200).json(Dogs[0]);

    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const createDog = async (req, res) => {
    try {
        const Dog = {
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

        const collection = await mongodb
            .getDatabase()
            .db()
            .collection('Dogs')

        const response = await collection.insertOne(Dog);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the dog.' });
        }

    } catch (err) {
        console.error('Error creating dogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateDog = async (req, res) => {
    try {
        const DogId = new ObjectId(req.params.id);

        const Dog = {
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

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('Dogs')
            .replaceOne({ _id: DogId }, Dog);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Dog not found or no changes applied.' });
        }

    } catch (err) {
        console.error('Error updating dogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteDog = async (req, res) => {
    try {
        const DogId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('Dogs')
            .deleteOne({ _id: DogId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Dog not found.' });
        }

    } catch (err) {
        console.error('Error deleting dogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAll,
    getOne,
    createDog,
    updateDog,
    deleteDog
};