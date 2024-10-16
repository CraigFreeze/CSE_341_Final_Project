const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const gradeController = {};

gradeController.getAll = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
        const result = await db.getDb().db().collection('grade').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
};

gradeController.createGrade = async (req, res, next) => {
    //#swagger.tags=['Grade']
    if (!req.body) {
        res.status(400).send();
        return;
    }
    const newGrade = {
        student_id: req.body.student_id,
        assignment_name: req.body.assignment_name,
        grade: req.body.grade,
    }
    const response = await db.getDb().db().collection('grade').insertOne(newGrade);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the grade');
    }
}

module.exports = gradeController;