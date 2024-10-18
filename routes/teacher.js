const express = require('express');
const routes = express.Router();
// const passport = require('passport');

const teacherController = require('../controllers/teacherController.js')

routes.get('/', teacherController.getAll())
routes.get('/:id', teacherController.getOne())
routes.get('/name/:name', teacherController.getByName())

// Pending, waiting for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});
// routes.get('/logout', teacherController.logout);
// routes.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
// 	(req, res) => {	
// 		req.session.user = req.user;
// 		res.redirect('/')});
routes.post('/', teacherController.createTeacher)
routes.put('/:id', teacherController.updateTeacher)
routes.delete('/:id', teacherController.deleteTeacher)

module.exports = routes;