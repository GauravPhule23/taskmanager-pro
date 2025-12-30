const mongoose = require('mongoose')

const taskModel = new mongoose.Schema({
  task : {type:String, required:true},
  completed : {type:String,enum:[true,false]},
  completionTime : {type : Date, required : true},
  inTime:{type:String,enum:[true,false]},
  user : {type:mongoose.Schema.Types.ObjectId,required:true, ref:"User"},
  

},{timestamps:true});

const Task = mongoose.model("Task",taskModel);

module.exports = Task;