const routes = require('express').Router();

const studentController = require('../controllers/studentController.js')

routes.get('/', studentController.getAll())
routes.get('/:id', studentController.getOne())
routes.get('/findByFirstName/:first_name', studentController.findByFirstName())
routes.get('/findByLastName/:last_name', studentController.findByLastName())
routes.post('/', studentController.createStudent)
routes.put('/:studentId', studentController.updateStudent)
routes.delete('/:studentId', studentController.deleteStudent)

module.exports = routes;