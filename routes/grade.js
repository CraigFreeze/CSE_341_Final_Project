const express = require('express');
const routes = express.Router();

const gradeController = require('../controllers/gradeController.js')

routes.get('/', gradeController.getAll());
routes.post('/', gradeController.createGrade)
// routes.get('/', gradeController.getOne(''))
routes.put('/:id', gradeController.updateGrade)
routes.delete('/:id', gradeController.deleteGrade)

module.exports = routes;