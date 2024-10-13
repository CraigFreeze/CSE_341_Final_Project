const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const classController = {};

classController.getAll = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
        const result = await db.getDb().db().collection('class').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
}

classController.getOne = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const result = await db.getDb().db().collection('class').find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

classController.createClass = async (req, res, next) => {
    //#swagger.tags=['Class']
    if (!req.body) {
        res.status(400).send();
        return;
    }
    const newClass = {
        course_code: req.body.course_code,
        subject: req.body.subject,
        class_description: req.body.class_description,
        max_class_size: req.body.max_class_size,
    }
    const response = await db.getDb().db().collection('class').insertOne(newClass);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating Class');
    }
}
module.exports = classController;