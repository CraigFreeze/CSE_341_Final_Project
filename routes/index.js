const routes = require('express').Router();
const passport = require("passport");
routes.use("/", require("./swagger.js"));

// // Base URL
// routes.get('/', (req, res) => {
//     res.send("School GradeBook API")
// });

routes.use('/student', require('./student.js'))
routes.use('/teacher', require('./teacher.js'))
routes.use('/class', require('./class.js'))
routes.use('/grade', require('./grade.js'))


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

module.exports = routes;