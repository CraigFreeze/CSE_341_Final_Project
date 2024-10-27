//Dependencies
const routes = require('express').Router();
const teacherController = require('../controllers/teacherController.js')

//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

//C
routes.post('/',isAuthenticated, validation.teacherCreateValidationRules(), validation.validate, teacherController.createTeacher)

//R
routes.get('/',isAuthenticated, teacherController.getAll())
routes.get('/:id',isAuthenticated, validation.teacherFindByIdValidationRules(), validation.validate, teacherController.getOne())
routes.get('/name/:name',isAuthenticated, validation.teacherFindNameValidationRules(), validation.validate, teacherController.getByName())

//U 
routes.put('/:id',isAuthenticated, validation.teacherUpdateValidationRules(), validation.validate, teacherController.updateTeacher)


//D
routes.delete('/:id',isAuthenticated, validation.teacherDeleteByIdValidationRules(), validation.validate, teacherController.deleteTeacher)



module.exports = routes;