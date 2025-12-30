const { Applog, Errorlog } = require("../Services/log");
const apiError = require('../Services/apiError');
const apiResponse = require('../Services/apiResponse');
const User = require("../Model/user");

async function register(req, res) {
  
  try {
    Applog("New User Registeration.....")
    let { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !email || !password || !role) {
      Errorlog("Data is Incomplete...")
      res.status(400).json(new apiError(400, "Data is Incomplete..."));
      return
    }

    if(!lastName){
      lastName = null;
    }

    if(await User.findOne({email})){
      Errorlog("User Already exists")
      return res.status(409).json(new apiError(409,"User Already exists"))
    }

    await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });

    Applog("User Created")

    const token = await User.checkTokenUser(email,password);
    Applog("User logged in too")
    return res.status(201).cookie('token',token,{
      maxAge:24*60*60*1000,
      httpOnly:true
    }).json(new apiResponse(201,"user created and logged in",token));
    

  } catch (error) {
    Errorlog(error)
    res.status(500).json(new apiError(500, "Error occured in registration", error));
    return
  }
  
  
}

async function signin(req,res){
  try {
    Applog("User logging in....")
    const {email,password} = req.body;

    if(!email || !password){
      Errorlog("Data is Incomplete...")
      res.status(400).json(new apiError(400, "Data is Incomplete..."));
      return
    }

    const token = await User.checkTokenUser(email,password);
    return res.status(200).cookie('token',token,{
      maxAge:24*60*60*1000,
      httpOnly:true
    }).json(new apiResponse(200,"user logged in",token));
    
  } catch (error) {
    Errorlog(error)
    res.status(500).json(new apiError(500, "Error occured in Signing in", error));
    return
  }
}

module.exports={
  register,
  signin
}