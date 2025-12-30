const apiError = require("../Services/apiError");
const { Applog } = require("../Services/log");


async function checkLogin(req,res,next){
  try {
    Applog("Checking user is Logged in or not")
    if(req && req.user){
      Applog("user is Logged in")
      next();
    }
    Applog("user is not Logged in, request Rejected")
    res.status(401).json(new apiError(401,"Unauthorized User"))
    return
  } catch (error) {
    res.status(500).json(new apiError(500,"Error in checkLogin",error))
    return
    
  }
}

module.exports=checkLogin;