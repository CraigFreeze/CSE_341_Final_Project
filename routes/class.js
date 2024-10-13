const routes = require('express').Router();

const classController = require('../controllers/classController.js')

routes.get('/', classController.getAll())
routes.get('/:id', classController.getOne())
routes.post('/', classController.createClass)

module.exports = routes;