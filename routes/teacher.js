//Dependencies
const routes = require('express').Router();
const teacherController = require('../controllers/teacherController.js')

//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');

//C
routes.post('/',isAuthenticated, validation.teacherCreateValidationRules(), validation.validate, teacherController.createTeacher)

//R
routes.get('/', teacherController.getAll())
routes.get('/:id', validation.teacherFindByIdValidationRules(), validation.validate, teacherController.getOne())
routes.get('/name/:name', validation.teacherFindNameValidationRules(), validation.validate, teacherController.getByName())

//U 
routes.put('/:id',isAuthenticated, validation.teacherUpdateValidationRules(), validation.validate, teacherController.updateTeacher)

//D
routes.delete('/:id',isAuthenticated, validation.teacherDeleteByIdValidationRules(), validation.validate, teacherController.deleteTeacher)



// Pending, waiting for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});
// routes.get('/logout', teacherController.logout);
// routes.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
// 	(req, res) => {	
// 		req.session.user = req.user;
// 		res.redirect('/')});

module.exports = routes;