// const routes = require('express').Router();
const express = require('express');
const routes = express.Router();
const passport = require("passport");
routes.use("/", require("./swagger.js"));

// // Base URL
// routes.get('/', (req, res) => {
//     res.send("School GradeBook API")
// });

routes.use('/student', require('./student'));
routes.use('/teacher', require('./teacher'));
routes.use('/class', require('./class'));
routes.use('/grade', require('./grade'));
routes.use("/", require("./swagger"));  // Assuming this serves the Swagger API documentation



routes.get('/',(req,res)=> {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out of School GradeBook API")});


// GitHub authentication route
routes.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));//,session:false reauthentication

// GitHub callback route
routes.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),//,session:false reauthentication
  (req, res) => {
    // Successful authentication
    req.session.user = req.user; //uncomment if doesnt callbackproperly
    res.redirect("/profile");
  }
);

// Profile route (only accessible when authenticated)
routes.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) { //(!req.isAuthenticated)
      res.send("Please login to continue.");  // Show logout message
      return res.redirect("/");
    }
    res.send(`Hello, ${req.user.displayName}`);
  });
  
  // Logout route (show message "Logged out" after successful logout)
routes.get("/logout", (req, res, next) => {
    req.logout((err) => {
    if (err) return next(err);  // Handle any errors during logout

    // Destroy the session
    req.session.destroy((err) => {
    if (err) return next(err);  // Handle any session destruction errors
    res.clearCookie('connect.sid');  // Clears the session cookie
    res.send("You have successfully logged out.");  // Show logout message
    });
});
});

// Catch-all for 404 errors
routes.use((req, res) => {
  if (process.env.NODE_ENV !== 'test') {
      console.log(req.path); // Only log if not in test environment
  }
  res.status(404).json({ message: "Route not found" }); // Respond directly with 404 and JSON message
});

module.exports = routes;