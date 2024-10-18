//Dependencies
const routes = require('express').Router();
const classController = require('../controllers/classController.js')

//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

//C
routes.post('/',isAuthenticated, validation.classCreateValidationRules(), validation.validate, classController.createClass);

//R
routes.get('/', isAuthenticated,classController.getAll);
routes.get('/:id',isAuthenticated, classController.getOne);
routes.get('/subject/:subject',isAuthenticated, validation.classBySubjectValidationRules(), validation.validate, classController.getSubject());

//U
routes.put('/:classId',isAuthenticated, validation.classUpdateValidationRules(), validation.validate, classController.updateClass);

//D
routes.delete('/:classId',isAuthenticated, validation.classDeleteByIdValidationRules(), validation.validate, classController.deleteClass);


module.exports = routes;