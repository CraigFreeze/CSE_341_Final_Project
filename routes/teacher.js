const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teacherController.js')

routes.get('/', teacherController.getAll())
routes.get('/:id', teacherController.getOne())
routes.post('/', teacherController.createTeacher)
routes.put('/:id', teacherController.updateTeacher)
routes.delete('/:id', teacherController.deleteTeacher)
module.exports = routes;