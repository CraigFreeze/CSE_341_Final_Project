//Dependencies
const routes = require('express').Router();
const gradeController = require('../controllers/gradeController.js')


//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

//C
routes.post('/', isAuthenticated, validation.gradeCreateValidationRules(), validation.validate,  gradeController.createGrade)

//R
// routes.get('/', gradeController.getOne(''))
routes.get('/', gradeController.getAll());
routes.get('/student/:studentId', validation.gradeFindByStudentIdValidationRules(), validation.validate, gradeController.getStudentId());
routes.get('/:grade', validation.gradeFindByIdValidationRules(), validation.validate, gradeController.getGradeId());
routes.get('/',isAuthenticated, gradeController.getAll());
routes.get('/student/:studentId',isAuthenticated, validation.gradeFindByStudentIdValidationRules(), validation.validate, gradeController.getStudentId());
routes.get('/:grade',isAuthenticated, validation.gradeFindByIdValidationRules(), validation.validate, gradeController.getGradeId());

//U
routes.put('/:id', isAuthenticated, validation.gradeUpdateValidationRules(), validation.validate, gradeController.updateGrade)

//D
routes.delete('/:id', isAuthenticated, validation.gradeDeleteByIdValidationRules(), validation.validate, gradeController.deleteGrade)


module.exports = routes;