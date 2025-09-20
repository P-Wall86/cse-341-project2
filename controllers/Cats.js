const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('Cats')
            .find();
        const Cats = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Cats);

    } catch (err) {
        console.error('Error fetching Cats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const CatId = req.params.id;

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('Cats')
            .find({ _id: new ObjectId(CatId) });
        const Cats = await result.toArray();

        if (!Cats[0]) {
            return res.status(404).json({ error: 'Cat not found' });
        }

        res.status(200).json(Cats[0]);

    } catch (err) {
        console.error('Error fetching Cats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const createCat = async (req, res) => {
    try {
        const Cat = {
            name: req.body.name,
            age: req.body.age,
            color: req.body.color,
            indoor: req.body.indoor
        };

        const collection = await mongodb
            .getDatabase()
            .db()
            .collection('Cats')

        const response = await collection.insertOne(Cat);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the cat.' });
        }

    } catch (err) {
        console.error('Error creating cats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCat = async (req, res) => {
    try {
        const CatId = new ObjectId(req.params.id);

        const Cat = {
            name: req.body.name,
            age: req.body.age,
            color: req.body.color,
            indoor: req.body.indoor
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('Cats')
            .replaceOne({ _id: CatId }, Cat);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cat not found or no changes applied.' });
        }

    } catch (err) {
        console.error('Error updating Cats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteCat = async (req, res) => {
    try {
        const CatId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('Cats')
            .deleteOne({ _id: CatId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Cat not found.' });
        }

    } catch (err) {
        console.error('Error deleting Cats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAll,
    getOne,
    createCat,
    updateCat,
    deleteCat
};