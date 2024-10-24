const isAuthenticated = (req,res,next) => {
    if (req.session.user === undefined){
      return res.status(401).json("You do not have access.Please Authenticate.");
    }
    next();
  };
  
  module.exports={
    isAuthenticated
  }