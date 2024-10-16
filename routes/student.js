const routes = require('express').Router();

const studentController = require('../controllers/studentController.js')

routes.get('/', studentController.getAll())
routes.get('/:id', studentController.getOne())
routes.post('/', studentController.createStudent)

module.exports = routes;