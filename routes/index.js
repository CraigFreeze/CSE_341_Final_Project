const routes = require('express').Router();

routes.use("/", require("./swagger.js"));

// Base URL
routes.get('/', (req, res) => {
    res.send("School GradeBook API")
});

routes.use('/student', require('./student.js'))
routes.use('/teacher', require('./teacher.js'))
routes.use('/class', require('./class.js'))
routes.use('/grade', require('./grade.js'))

module.exports = routes;