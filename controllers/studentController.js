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
student.findByFirstName = () => {
    //#swagger.tags=['Student']
    try {
        return async (req, res) => {
            const firstName = req.params.first_name.toLowerCase();
            const result = await db.getDb().db().collection('student').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                var found = [];
                contacts.map((contact) => {if (contact.first_name.toLowerCase() == firstName) found.push(contact)});
                if (found.length > 0) {
                    res.status(200).json(found);
                } else {
                    res.status(200).send('No students were found');
                }
            });
        }
    } catch {
        return res.status(500).send('Some error occurred while tring to find Student');
    }
}

student.findByLastName = () => {
    //#swagger.tags=['Student']
    try {
        return async (req, res) => {
            const lastName = req.params.last_name.toLowerCase();
            const result = await db.getDb().db().collection('student').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                var found = [];
                contacts.map((contact) => {if (contact.last_name.toLowerCase() == lastName) found.push(contact)});
                if (found.length > 0) {
                    res.status(200).json(found);
                } else {
                    res.status(200).send('No students were found');
                }
            });
        }
    } catch {
        return res.status(500).send('Some error occurred while tring to find Student');
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

student.updateStudent = async (req, res, next) => {
    //#swagger.tags=['Student']
    const studentId = new ObjectId(req.params.studentId);
    if (!req.body) {
        return res.status(400).send({message: 'Data to update cannot be empty'});
    }
    const update = ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        enrolled_classes: req.body.enrolled_classes,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        grade_level: req.body.grade_level,
        home_room_teacher: req.body.home_room_teacher,
    })
    const response = await db.getDb().db().collection('student').replaceOne({_id: studentId}, update)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).send({message: err.message || `Error updating Student with Id: ${studentId}`})
    }
}

student.deleteStudent = async (req, res, next) => {
    //#swagger.tags=['Student']
    const studentId = new ObjectId(req.params.studentId);
    const response = await db.getDb().db().collection('student').deleteOne({_id: studentId})
    .then(result => {
        if (result.deleteCount === 0) {
            res.status(500).json(
                response.error || `Cannot delete Student with id:${studentId}. Maybe Student was not found`
            )
            // return res.json('Cannot delete Car');
        }
        res.status(204).send();
    })
}
module.exports = student;