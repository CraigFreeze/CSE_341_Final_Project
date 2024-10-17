const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const student = {}; 

student.getAll = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        const result = await db.getDb().db().collection('student').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
}

student.getOne = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const result = await db.getDb().db().collection('student').find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

student.createStudent = async (req, res, next) => {
    //#swagger.tags=['Student']
    if (!req.body) {
        res.status(400).send();
        return;
    }
    const newStudent = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        enrolled_classes: req.body.enrolled_classes,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        grade_level: req.body.grade_level,
        home_room_teacher: req.body.home_room_teacher,
    }
    const response = await db.getDb().db().collection('student').insertOne(newStudent);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating Student');
    }
}

student.updateStudent =  async (req, res, next) => {
    const studentId = new ObjectId(req.params.id);
    const updatedstudent = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        enrolled_classes: req.body.enrolled_classes,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        grade_level: req.body.grade_level,
        home_room_teacher: req.body.home_room_teacher,
    };
    const response = await db.getDb().db().collection('student').replaceOne({_id: studentId}, updatedstudent);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the student');
    }
};

student.deleteStudent =  async (req, res, next) => {
    const studentId = new ObjectId(req.params.id);
    const response = await db.getDb().db().collection('student').deleteOne({_id: studentId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the student');
    }
}

module.exports = student;