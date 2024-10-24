//Dependencies
const routes = require('express').Router();
const studentController = require('../controllers/studentController.js')
const student = require('../controllers/studentController.js');

//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

//C
routes.post('/',isAuthenticated, validation.studentCreateValidationRules(), validation.validate, studentController.createStudent)

//R
routes.get('/', studentController.getAll())
routes.get('/:id', validation.studentFindByIdValidationRules(), validation.validate, studentController.getOne())
routes.get('/findByFirstName/:first_name', validation.studentFindFirstNameValidationRules(), validation.validate, studentController.findByFirstName())
routes.get('/findByLastName/:last_name', validation.studentFindLastNameValidationRules(), validation.validate, studentController.findByLastName())

//U
routes.put('/:studentId',isAuthenticated, validation.studentUpdateValidationRules(), validation.validate, studentController.updateStudent)

//D
routes.delete('/:studentId',isAuthenticated, validation.studentDeleteByIdValidationRules(), validation.validate, studentController.deleteStudent)


module.exports = routes;