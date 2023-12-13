const jwt=require("jsonwebtoken");

module.exports = (req, res, next) => {

  let authHeader=req.headers.authorization;

  if(authHeader==undefined)
  {
    
    res.status(401).send({error:"no token provided"});
  }
  let token=authHeader.split(" ").pop()
  jwt.verify(token,"secret",function(err,decoded){
    if(err){
      res.status(500).send({error:"Authentication Failed"})
    }
    else{
      req.isAuth = true;
      req.username = decoded.username;
      req.userData = decoded;
      return next();
    }

  })
}