const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto')
const {createToken} = require('../Services/token')
const apiError = require('../Services/apiError');
const { Applog } = require('../Services/log');

const userModel = new mongoose.Schema({
  firstName : {type:String, required:true},
  lastName : {type:String},
  email:{type:String,required:true,unique:true},
  password : {type:String,required:true},
  salt : {type:String,required:true},
  role:{type:String,enum:["user","admin"], default:"user"},

},{Timestamps:true});

userModel.pre("save",async function(next){
  Applog("Hashing password")
  const user = this
  if(!user.isModified('password')) return
  const salt = randomBytes(21).toString();
  const hashPass = createHmac("sha256",salt).update(user.password).digest('hex')

  this.salt = salt;
  this.password = hashPass;
})

userModel.static("checkTokenUser", async function (email, password) {
  const user = await this.findOne({ email })
  if (!user) throw new apiError(404,"No user Found","email is incorrect")
  const salt = user.salt
  const hashedPassword = user.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword){ 
    Applog("Password Incorrect or Email")
    throw new apiError(404,"Incorrect password","Incorrect pass or email")
  }
  const token = await createToken(user);
  Applog("Password Verified . .")
  return token
})

// userModel.method("isPassCorrect", async function (password){
//   const user = await this
//   if (!user) throw new Error("No user Found")
//   const salt = user.salt
//   const hashedPassword = user.password
//   const userPassword = createHmac("sha256", salt).update(password).digest("hex")
//   if (userPassword !== hashedPassword) {
//     return false
//   }
//   return true
// })

const User = mongoose.model("User",userModel);

module.exports = User;