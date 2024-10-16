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

const createTeacher = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send();
        return;
    }
    const newTeacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        subject: req.body.subject,
        classes: req.body.classes,
    }
    const response = await db.getDb().db().collection('teacher').insertOne(newTeacher);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating Teacher');
    }
}

module.exports = {
    getOne, getAll, createTeacher,
}
