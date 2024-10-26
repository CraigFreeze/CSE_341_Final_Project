const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const gradeController = {};

// Corrected getAll method
gradeController.getAll = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
        const db = mongodb.getDb();
        try {
            const result = await db.collection('grade').find();
            result.toArray().then((contacts) => {
                res.setHeader('Content-Type', 'application/json');
                if (contacts.length > 0) {
                    res.status(200).json(contacts);
                } else {
                    res.status(404).json({ message: "No grades found in the database" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving grades", error: error.message });
        }
    };
};

// Corrected getGradeId method
gradeController.getGradeId = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
<<<<<<< HEAD
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
=======
        const id = new ObjectId(req.params.grade);
        const db = mongodb.getDb();

        try {
            const result = await db.collection('grade').find({ _id: id });
            result.toArray().then((grades) => {
                if (grades.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(grades[0]);
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f
                } else {
                    res.status(404).json({ message: "Grade not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving the grade", error: error.message });
        }
    };
};

// Corrected getStudentId method
gradeController.getStudentId = () => {
    //#swagger.tags=['Grade']
    return async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const db = mongodb.getDb();
            const result = await db.collection('grade').find({ student_id: studentId });
            result.toArray().then((grades) => {
                res.setHeader('Content-Type', 'application/json');
                if (grades.length > 0) {
                    res.status(200).json(grades);
                } else {
                    res.status(404).json({ message: "Student ID not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving grades by student ID", error: error.message });
        }
    };
};

// Corrected createGrade method
gradeController.createGrade = async (req, res) => {
    //#swagger.tags=['Grade']
    if (!req.body) {
        res.status(400).send("No grade data provided");
        return;
    }
    const newGrade = {
        student_id: req.body.student_id,
        assignment_name: req.body.assignment_name,
        grade: req.body.grade,
<<<<<<< HEAD
    }
    const db = mongodb.getDb();
    const response = await db.collection('grade').insertOne(newGrade);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the grade');
    }
}

gradeController.updateGrade = async (req, res, next) => {
=======
    };
    const db = mongodb.getDb();

    try {
        const result = await db.collection('grade').insertOne(newGrade);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ message: "An error occurred while creating the grade" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the grade", error: error.message });
    }
};

// Corrected updateGrade method
gradeController.updateGrade = async (req, res) => {
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f
    //#swagger.tags=['Grade']
    const gradeId = new ObjectId(req.params.id);
    if (!req.body) {
        res.status(400).send({ message: 'Data to update cannot be empty' });
        return;
    }
    const updatedGrade = {
        student_id: req.body.student_id,
        assignment_name: req.body.assignment_name,
        grade: req.body.grade,
    };
    const db = mongodb.getDb();
<<<<<<< HEAD
    const response = await db.collection('grade').replaceOne({ _id: gradeId }, updatedgrade);
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
    const response = await db.collection('grade').deleteOne({ _id: gradeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the grade');
    }
}
=======

    try {
        const result = await db.collection('grade').replaceOne({ _id: gradeId }, updatedGrade);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Grade with ID ${gradeId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the grade", error: error.message });
    }
};

// Corrected deleteGrade method
gradeController.deleteGrade = async (req, res) => {
    //#swagger.tags=['Grade']
    const gradeId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f

    try {
        const result = await db.collection('grade').deleteOne({ _id: gradeId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Grade with ID ${gradeId} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the grade", error: error.message });
    }
};

module.exports = gradeController;
