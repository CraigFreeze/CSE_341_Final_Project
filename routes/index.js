const routes = require('express').Router();


routes.get('/', res.send("School Grade Book API"));
routes.use('/student', require('./student.js'))
routes.use('/teacher', require('./teacher.js'))
routes.use('/class', require('./class.js'))
routes.use('/grade', require('./grade.js'))

module.exports = routes;