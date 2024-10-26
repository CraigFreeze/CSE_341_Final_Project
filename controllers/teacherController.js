const mongodb = require('../data/database');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Corrected getAll method
const getAll = () => {
    //#swagger.tags=['Teacher']
    return async (req, res) => {
        const db = mongodb.getDb();
        try {
            const result = await db.collection('teacher').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                if (contacts.length > 0) {
                    res.status(200).json(contacts);
                } else {
                    res.status(404).json({ message: "No teachers found in the database" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving teachers", error: error.message });
        }
    };
};

// Corrected getOne method
const getOne = () => {
    //#swagger.tags=['Teacher']
    return async (req, res) => {
        const id = new ObjectId(req.params.id);
        const db = mongodb.getDb();

        try {
            const result = await db.collection('teacher').find({ _id: id });
            result.toArray().then((teachers) => {
                if (teachers.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(teachers[0]);
                } else {
                    res.status(404).json({ message: "Teacher not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving the teacher", error: error.message });
        }
    };
};

const getByName = () => {
    //#swagger.tags=['Teacher']
    return async (req, res) => {
        try {
            const firstName = req.params.name?.toLowerCase();
            const db = mongodb.getDb();
            const result = await db.collection('teacher').find();
            const contacts = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            const found = contacts.filter((contact) => contact.first_name?.toLowerCase() === firstName);

            if (found.length > 0) {
                return res.status(200).json(found);
            } else {
                return res.status(404).json({ message: "No teachers were found with the specified first name" });
            }
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while trying to find teacher by first name", error: error.message });
        }
    };
};


// Corrected createTeacher method
const createTeacher = async (req, res) => {
    //#swagger.tags=['Teacher']
    if (!req.body) {
        res.status(400).json({ message: "No teacher data provided" });
        return;
    }
    const newTeacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        subject: req.body.subject,
        classes: req.body.classes,
    };
    const db = mongodb.getDb();

    try {
        const result = await db.collection('teacher').insertOne(newTeacher);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ message: "An error occurred while creating the teacher" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the teacher", error: error.message });
    }
};

// Corrected updateTeacher method
const updateTeacher = async (req, res) => {
    //#swagger.tags=['Teacher']
    const teacherId = new ObjectId(req.params.id);
    if (!req.body) {
        res.status(400).json({ message: "Data to update cannot be empty" });
        return;
    }
    const updatedTeacher = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        subject: req.body.subject,
        classes: req.body.classes,
    };
    const db = mongodb.getDb();

    try {
        const result = await db.collection('teacher').replaceOne({ _id: teacherId }, updatedTeacher);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Teacher with ID ${teacherId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the teacher", error: error.message });
    }
};

// Corrected deleteTeacher method
const deleteTeacher = async (req, res) => {
    //#swagger.tags=['Teacher']
    const teacherId = new ObjectId(req.params.id);
    const db = mongodb.getDb();

    try {
        const result = await db.collection('teacher').deleteOne({ _id: teacherId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Teacher with ID ${teacherId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the teacher", error: error.message });
    }
};

module.exports = {
    getAll,
    getOne,
    getByName,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};
