const express = require('express');
const routes = express.Router();

const gradeController = require('../controllers/gradeController.js')

routes.get('/', gradeController.getAll());
routes.get('/student/:studentId', gradeController.getStudentId());
routes.get('/:grade', gradeController.getGradeId());

routes.post('/', gradeController.createGrade)
// routes.get('/', gradeController.getOne(''))


module.exports = routes;