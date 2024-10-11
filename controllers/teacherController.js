const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = () => {
    return async (req, res) => {
        const result = await db.getDb().db().collection('teacher').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
}

const getOne = () => {
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const result = await db.getDb().db().collection('teacher').find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

module.exports = {
    getOne, getAll
}
