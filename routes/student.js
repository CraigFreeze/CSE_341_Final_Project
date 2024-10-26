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
<<<<<<< HEAD
routes.get('/', studentController.getAll())
routes.get('/:id', validation.studentFindByIdValidationRules(), validation.validate, studentController.getOne())
routes.get('/findByFirstName/:first_name', validation.studentFindFirstNameValidationRules(), validation.validate, studentController.findByFirstName())
routes.get('/findByLastName/:last_name', validation.studentFindLastNameValidationRules(), validation.validate, studentController.findByLastName())
=======
routes.get('/',isAuthenticated, studentController.getAll())
routes.get('/:id',isAuthenticated, validation.studentFindByIdValidationRules(), validation.validate, studentController.getOne())
routes.get('/findByFirstName/:first_name',isAuthenticated, validation.studentFindFirstNameValidationRules(), validation.validate, studentController.findByFirstName())
routes.get('/findByLastName/:last_name',isAuthenticated, validation.studentFindLastNameValidationRules(), validation.validate, studentController.findByLastName())
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f

//U
routes.put('/:studentId',isAuthenticated, validation.studentUpdateValidationRules(), validation.validate, studentController.updateStudent)

//D
routes.delete('/:studentId',isAuthenticated, validation.studentDeleteByIdValidationRules(), validation.validate, studentController.deleteStudent)


module.exports = routes;