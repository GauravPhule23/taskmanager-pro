const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  firstName : {type:String, required:true},
  lastName : {type:String},
  email:{type:String,required:true,unique:true},
  password : {type:String,required:true},
  salt : {type:String,required:true},
  role:{type:String,enum:["user","admin"], default:"user"},

},{Timestamps:true});

const User = mongoose.model("User",userModel);

module.exports = User;