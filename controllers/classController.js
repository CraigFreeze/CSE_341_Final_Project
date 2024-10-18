const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const classController = {};

//Make sure to initialize .getDb before any action and do not use db as variable name.

classController.getAll = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
      const db = mongodb.getDb();
        const result = await db.collection('class').find();
        result.toArray().then((contacts) => {
            // res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
};

classController.getOne = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
      const db = mongodb.getDb();
        const id = new ObjectId(req.params.id)
        const result = await db.collection('class').find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

classController.getSubject = () => {
    //#swagger.tags=['Class']
    try {
        return async (req, res) => {
        const db = mongodb.getDb();
            const subject = req.params.subject.toLowerCase();
            const result = await db.collection('class').find();
            result.toArray().then((clases) => {
                res.setHeader('Content-Type', 'application/json');
                var found = [];
                clases.map((classSub) => {if (classSub.subject.toLowerCase() == subject) found.push(classSub)});
                if (found.length > 0) {
                    res.status(200).json(found);
                } else {
                    res.status(200).send('No subject were found');
                }
            });
        }
    } catch {
        return res.status(500).send('Some error occurred while tring to find subject');
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
    const db = mongodb.getDb();
    const response = await db.collection('class').insertOne(newClass);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating Class');
    }
}

classController.updateClass = async (req, res, next) => {
    //#swagger.tags=['Class']
    const classId = new ObjectId(req.params.classId);
    if (!req.body) {
        return res.status(400).send({message: 'Data to update cannot be empty'});
    }
    const update = ({
        course_code: req.body.course_code,
        subject: req.body.subject,
        class_description: req.body.class_description,
        max_class_size: req.body.max_class_size
    })
    const db = mongodb.getDb();
    const response = await db.collection('class').replaceOne({_id: classId}, update)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).send({message: err.message || `Error updating Student with Id: ${classId}`})
    }
}

classController.deleteClass = async (req, res, next) => {
    //#swagger.tags=['Class']
    const classId = new ObjectId(req.params.classId);
    const db = mongodb.getDb();
    const response = await db.collection('class').deleteOne({_id: classId})
    .then(result => {
        if (result.deleteCount === 0) {
            res.status(500).json(
                response.error || `Cannot delete class with id:${classId}. Maybe class was not found`
            )
            // return res.json('Cannot delete Car');
        }
        res.status(204).send();
    })
}

module.exports = classController;