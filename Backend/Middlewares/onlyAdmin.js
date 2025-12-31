const { Errorlog, Applog } = require("../../Services/log")

async function onlyAdmin(req,res,next){
    Applog("Checking if the User is admin or not")
    if(req && req.user && req.user.role == "admin"){
      Applog("User is Admin and Acces is granted")
      
      return next()
    }else{
      Errorlog('only admin Authorized to use this route')
      return res.status(400).json(new apiError(400,"Not eligible",`${req.user.role} not Authorized to hit this route`))
    }
  
}

module.exports = onlyAdmin