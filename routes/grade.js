const express = require('express');
const routes = express.Router();

const gradeController = require('../controllers/gradeController.js')

const validation = require("../middleware/validator.js");


routes.get('/', gradeController.getAll());
routes.get('/student/:studentId', validation.gradeFindByStudentIdValidationRules(), validation.validate, gradeController.getStudentId());
routes.get('/:grade', validation.gradeFindByIdValidationRules(), validation.validate, gradeController.getGradeId());

routes.post('/',validation.gradeCreateValidationRules(), validation.validate,  gradeController.createGrade)
// routes.get('/', gradeController.getOne(''))
routes.put('/:id', validation.gradeUpdateValidationRules(), validation.validate, gradeController.updateGrade)
routes.delete('/:id', validation.gradeDeleteByIdValidationRules(), validation.validate, gradeController.deleteGrade)


module.exports = routes;