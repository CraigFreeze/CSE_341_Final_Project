const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const classController = {};

// Corrected getAll method
classController.getAll = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
        const database = mongodb.getDb();
        try {
            const result = await database.collection('class').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                if (contacts.length > 0) {
                    res.status(200).json(contacts);
                } else {
                    res.status(404).json({ message: "No classes found in the database" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving classes", error: error.message });
        }
    };
};

// Corrected getOne method
classController.getOne = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
        const database = mongodb.getDb();
        const id = new ObjectId(req.params.id);
        
        try {
            const result = await database.collection('class').find({ _id: id });
            result.toArray().then((classes) => {
                if (classes.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(classes[0]);
                } else {
                    res.status(404).json({ message: "Class not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving the class", error: error.message });
        }
    };
};

// Corrected getSubject method
classController.getSubject = () => {
    //#swagger.tags=['Class']
    return async (req, res) => {
        try {
            const database = mongodb.getDb();
            const subject = req.params.subject?.toLowerCase();
            const result = await database.collection('class').find();
            const classes = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            const found = classes.filter((classSub) => classSub.subject?.toLowerCase() === subject);

            if (found.length > 0) {
                return res.status(200).json(found);
            } else {
                return res.status(404).json({ message: "No classes found for the specified subject" });
            }
        } catch (error) {
            return res.status(500).json({ message: "An error occurred while trying to find subject", error: error.message });
        }
    };
};


// Corrected createClass method
classController.createClass = async (req, res) => {
    //#swagger.tags=['Class']
    if (!req.body) {
        res.status(400).send("No Class data provided");
        return;
    }
    const newClass = {
        course_code: req.body.course_code,
        subject: req.body.subject,
        class_description: req.body.class_description,
        max_class_size: req.body.max_class_size,
    };
    const database = mongodb.getDb();
    
    try {
        const response = await database.collection('class').insertOne(newClass);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating Class' });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the class", error: error.message });
    }
};

// Corrected updateClass method
classController.updateClass = async (req, res) => {
    //#swagger.tags=['Class']
    const classId = new ObjectId(req.params.classId);
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update cannot be empty' });
    }
    const update = {
        course_code: req.body.course_code,
        subject: req.body.subject,
        class_description: req.body.class_description,
        max_class_size: req.body.max_class_size,
    };
    const database = mongodb.getDb();
    
    try {
        const response = await database.collection('class').replaceOne({ _id: classId }, update);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: `Class with ID ${classId} not found` });
        }
    } catch (error) {
        res.status(500).send({ message: `An error occurred while updating class with ID ${classId}`, error: error.message });
    }
};

// Corrected deleteClass method
classController.deleteClass = async (req, res) => {
    //#swagger.tags=['Class']
    const classId = new ObjectId(req.params.classId);
    const database = mongodb.getDb();
    
    try {
        const response = await database.collection('class').deleteOne({ _id: classId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: `Class with ID ${classId} not found` });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: `An error occurred while deleting class with ID ${classId}`, error: error.message });
    }
};

module.exports = classController;
