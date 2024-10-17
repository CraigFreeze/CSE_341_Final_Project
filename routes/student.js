const routes = require('express').Router();

const student = require('../controllers/studentController.js');
const studentController = require('../controllers/studentController.js')

routes.get('/', studentController.getAll())
routes.get('/:id', studentController.getOne())
routes.post('/', studentController.createStudent)
routes.put('/:id', studentController.updateStudent)
routes.delete('/:id', studentController.deleteStudent)

module.exports = routes;