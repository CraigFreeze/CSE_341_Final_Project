const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = () => {
    //#swagger.tags=['Teacher']
    return async (req, res) => {
        const result = await db.getDb().db().collection('teacher').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
}

const getOne = () => {
    //#swagger.tags=['Teacher']
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const result = await db.getDb().db().collection('teacher').find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

const getByName = () => {
    //#swagger.tags=['Teacher']
    try {
        return async (req, res) => {
            const firstName = req.params.name.toLowerCase();
            const result = await db.getDb().db().collection('teacher').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                var found = [];
                contacts.map((contact) => {if (contact.first_name.toLowerCase() == firstName) found.push(contact)});
                if (found.length > 0) {
                    res.status(200).json(found);
                } else {
                    res.status(200).send('No teachers were found');
                }
            });
        }
    } catch {
        return res.status(500).send('Some error occurred while tring to find teacher by first name');
    }
}


const createTeacher = async (req, res, next) => {
    //#swagger.tags=['Teacher']
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

const updateTeacher = async (req, res, next) => {
    //#swagger.tags=['Teacher']
    const teacherId = new ObjectId(req.params.id);
    const updatedteacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        subject: req.body.subject,
        classes: req.body.classes,
    };
    const response = await db.getDb().db().collection('teacher').replaceOne({_id: teacherId}, updatedteacher);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the teacher');
    }
};

const deleteTeacher = async (req, res, next) => {
    //#swagger.tags=['Teacher']
    const teacherId = new ObjectId(req.params.id);
    const response = await db.getDb().db().collection('teacher').deleteOne({_id: teacherId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the teacher');
    }
}


module.exports = {


    getOne, getAll, createTeacher, getByName, updateTeacher, deleteTeacher

}
