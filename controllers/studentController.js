const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const student = {};

// Corrected getAll method
student.getAll = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        const db = mongodb.getDb();
        try {
            const result = await db.collection('student').find();
            result.toArray().then((students) => {
                res.setHeader('Content-Type', 'application/json');
                if (students.length > 0) {
                    res.status(200).json(students);
                } else {
                    res.status(404).json({ message: "No students found in the database" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving students", error: error.message });
        }
    };
};

// Corrected getOne method
student.getOne = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb();

        try {
            const result = await db.collection('student').find({ _id: id });
            result.toArray().then((students) => {
                if (students.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(students[0]);
                } else {
                    res.status(404).json({ message: "Student not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving the student", error: error.message });
        }
    };
};

student.findByFirstName = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        try {
            const firstName = req.params.first_name?.toLowerCase();
            const db = mongodb.getDb();
            const result = await db.collection('student').find();
            const students = await result.toArray();
            
            res.setHeader('Content-Type', 'application/json');
            const found = students.filter((student) => student.first_name?.toLowerCase() === firstName);
            
            if (found.length > 0) {
                return res.status(200).json(found);
            } else {
                return res.status(404).json({ message: "No students found with the specified first name" });
            }
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while searching for student by first name", error: error.message });
        }
    };
};


student.findByLastName = () => {
    //#swagger.tags=['Student']
    return async (req, res) => {
        try {
            const lastName = req.params.last_name?.toLowerCase();
            const db = mongodb.getDb();
            const result = await db.collection('student').find();
            const students = await result.toArray();
            
            const found = students.filter((student) => student.last_name?.toLowerCase() === lastName);
            
            if (found.length > 0) {
                return res.status(200).json(found);
            } else {
                return res.status(404).json({ message: "No students found with the specified last name" });
            }
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while searching for student by last name", error: error.message });
        }
    };
};


// Corrected createStudent method
student.createStudent = async (req, res) => {
    //#swagger.tags=['Student']
    if (!req.body) {
        res.status(400).json({ message: "No student data provided" });
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
    };
    const db = mongodb.getDb();

    try {
        const result = await db.collection('student').insertOne(newStudent);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ message: "An error occurred while creating the student" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the student", error: error.message });
    }
};

// Corrected updateStudent method
student.updateStudent = async (req, res) => {
    //#swagger.tags=['Student']
    const studentId = new ObjectId(req.params.studentId);
    if (!req.body) {
        res.status(400).json({ message: "Data to update cannot be empty" });
        return;
    }
    const update = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        enrolled_classes: req.body.enrolled_classes,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        grade_level: req.body.grade_level,
        home_room_teacher: req.body.home_room_teacher,
    };
    const db = mongodb.getDb();

    try {
        const result = await db.collection('student').replaceOne({ _id: studentId }, update);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Student with ID ${studentId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the student", error: error.message });
    }
};

// Corrected deleteStudent method
student.deleteStudent = async (req, res) => {
    //#swagger.tags=['Student']
    const studentId = new ObjectId(req.params.studentId);
    const db = mongodb.getDb();

    try {
        const result = await db.collection('student').deleteOne({ _id: studentId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Student with ID ${studentId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the student", error: error.message });
    }
};

module.exports = student;
