const express = require('express');
const routes = express.Router();
// const passport = require('passport');

const teacherController = require('../controllers/teacherController.js')

const validation = require("../middleware/validator.js");



routes.get('/', teacherController.getAll())
routes.get('/:id', validation.teacherFindByIdValidationRules(), validation.validate, teacherController.getOne())
routes.get('/name/:firstName', validation.teacherFindNameValidationRules(), validation.validate, teacherController.getByFirstName())

// Pending, waiting for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});
// routes.get('/logout', teacherController.logout);
// routes.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
// 	(req, res) => {	
// 		req.session.user = req.user;
// 		res.redirect('/')});
routes.post('/', validation.teacherCreateValidationRules(), validation.validate, teacherController.createTeacher)
routes.put('/:id', validation.teacherUpdateValidationRules(), validation.validate, teacherController.updateTeacher)
routes.delete('/:id', validation.teacherDeleteByIdValidationRules(), validation.validate, teacherController.deleteTeacher)

module.exports = routes;