const mongoose = require('mongoose')

const taskModel = new mongoose.Schema({
  task : {type:String, required:true},
  completed : {type:String,enum:[true,false]},
  inTime:{type:String,enum:[true,false]},
  user : {type:mongoose.Schema.Types.ObjectId,required:true},
  

},{timestamps:true});

const Task = mongoose.model("Task",taskModel);

module.exports = Task;