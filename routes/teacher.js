//Dependencies
const routes = require('express').Router();
const teacherController = require('../controllers/teacherController.js')

//Validation and Authentication
const validation = require("../middleware/validator.js");
const { isAuthenticated } = require('../middleware/authenticate');
<<<<<<< HEAD
=======

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
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f

//C
routes.post('/',isAuthenticated, validation.teacherCreateValidationRules(), validation.validate, teacherController.createTeacher)

<<<<<<< HEAD
//R
routes.get('/', teacherController.getAll())
routes.get('/:id', validation.teacherFindByIdValidationRules(), validation.validate, teacherController.getOne())
routes.get('/name/:name', validation.teacherFindNameValidationRules(), validation.validate, teacherController.getByName())

//U 
routes.put('/:id',isAuthenticated, validation.teacherUpdateValidationRules(), validation.validate, teacherController.updateTeacher)

//D
routes.delete('/:id',isAuthenticated, validation.teacherDeleteByIdValidationRules(), validation.validate, teacherController.deleteTeacher)


=======
>>>>>>> 3858b4a16bc7d722631d2b2eadb6aafa8b0f9a1f

// Pending, waiting for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});
// routes.get('/logout', teacherController.logout);
// routes.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
// 	(req, res) => {	
// 		req.session.user = req.user;
// 		res.redirect('/')});

module.exports = routes;