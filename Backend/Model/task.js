const mongoose = require('mongoose')

const taskModel = new mongoose.Schema({
  task : {type:String, required:true},
  completed : {type:Boolean,enum:[true,false],default:false},
  completionTime : {type : Date, required : true},
  inTime:{type:Boolean,enum:[true,false,null], default:null},
  user : {type:mongoose.Schema.Types.ObjectId,required:true, ref:"User"},
  

},{timestamps:true});

const Task = mongoose.model("Task",taskModel);

module.exports = Task;