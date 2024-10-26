const cors = require("cors");
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require("./middleware/passport"); // Passport configuration

const app = express();
const mongodb = require('./data/database.js');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "yourSecretKey",  // A strong secret for session encryption
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: process.env.NODE_ENV === "production" } // Comment this when live on render
    // cookie: { secure: false }

  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

// Server Start
// Initialize MongoDB and start server
mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});

// Set headers *before* the routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', require('./routes/index.js'));



// // Error handling
app.use((err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


// Error handler 2
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


module.exports = app;