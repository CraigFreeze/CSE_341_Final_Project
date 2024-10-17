const express = require('express');
const routes = express.Router();

const gradeController = require('../controllers/gradeController.js')

routes.get('/', gradeController.getAll());
routes.post('/', gradeController.createGrade)
// routes.get('/', gradeController.getOne(''))

module.exports = routes;