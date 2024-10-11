const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teacherController.js')

routes.get('/', teacherController.getAll())
routes.get('/:id', teacherController.getOne())

module.exports = routes;