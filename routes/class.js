const routes = require('express').Router();

const classController = require('../controllers/classController.js')

const validation = require("../middleware/validator.js");


routes.get('/', classController.getAll())
routes.get('/:id', validation.classFindByIdValidationRules(), validation.validate, classController.getOne())
routes.get('/subject/:subject', validation.classBySubjectValidationRules(), validation.validate, classController.getSubject())
routes.post('/', validation.classCreateValidationRules(), validation.validate, classController.createClass)



routes.put('/:classId', validation.classUpdateValidationRules(), validation.validate, classController.updateClass)
routes.delete('/:classId', validation.classDeleteByIdValidationRules(), validation.validate, classController.deleteClass)


module.exports = routes;