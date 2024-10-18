const routes = require('express').Router();

const classController = require('../controllers/classController.js')

routes.get('/', classController.getAll())
routes.get('/:id', classController.getOne())
routes.get('/subject/:subject', classController.getSubject())
routes.post('/', classController.createClass)



routes.put('/:classId', classController.updateClass)
routes.delete('/:classId', classController.deleteClass)


module.exports = routes;