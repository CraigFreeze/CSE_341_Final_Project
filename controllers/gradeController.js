const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const gradeController = {};

gradeController.getAll = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
        const db = mongodb.getDb();
        const result = await db.collection('grade').find();
        result.toArray().then((contacts) => {
            // res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
};

gradeController.getGradeId = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
        const id = new ObjectId(req.params.grade)
        const db = mongodb.getDb();
        const result = await db.collection('grade').find({ _id: id });
        result.toArray().then((grades) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(grades[0]);
        });
    }
}

gradeController.getStudentId = () => {
    //#swagger.tags=['Grade']
    try {
        return async (req, res) => {
            const studentId = req.params.studentId;
            const db = mongodb.getDb();
            const result = await db.collection('grade').find({ student_id: studentId });
            result.toArray().then((grades) => {
                res.setHeader('Content-Type', 'application/json');
                var found = [];
                grades.map((grade) => { if (grade.student_id == studentId) found.push(grade) });
                if (found.length > 0) {
                    res.status(200).json(found);
                } else {
                    res.status(200).send('Student Id not found');
                }
            });
        }
    } catch {
        return res.status(500).send('Some error occurred while tring to find student ID');
    }
}

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
    const db = mongodb.getDb();
    const result = await db.collection('grade').insertOne(newGrade);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the grade');
    }
}

gradeController.updateGrade = async (req, res, next) => {
    //#swagger.tags=['Grade']
    const gradeId = new ObjectId(req.params.id);
    const updatedgrade = {
        student_id: req.body.student_id,
        assignment_name: req.body.assignment_name,
        grade: req.body.grade,
    };
    const db = mongodb.getDb();
    const result = await db.collection('grade').replaceOne({ _id: gradeId }, updatedgrade);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the grade');
    }
};

gradeController.deleteGrade = async (req, res, next) => {
    //#swagger.tags=['Grade']
    const gradeId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection('grade').deleteOne({ _id: gradeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the grade');
    }
}

module.exports = gradeController;