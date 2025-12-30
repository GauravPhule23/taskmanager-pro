const { Errorlog } = require("../Services/log")

async function onlyAdmin(req,res,next){
  
    if(req.user.role == "admin"){
      
      return next()
    }else{
      Errorlog('only admin Authorized to use this route')
      return res.status(400).json(new apiError(400,"Not eligible",`${req.user.role} not Authorized to hit this route`))
    }
  
}

module.exports = onlyAdmin