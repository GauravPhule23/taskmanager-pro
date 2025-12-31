const Task = require('../../Model/task');
const User = require('../../Model/user');
const apiError = require('../../Services/apiError')
const apiResponse = require('../../Services/apiResponse')
const {Applog,Errorlog} = require('../../Services/log')

async function createTask(req,res){
  try {
    Applog("Checking if the user exists")
    if(!await User.findById(req.user._id)){
      Applog("User not found")
      return res.status(401).json(new apiError(401,"User Not Found"))
    }
    Applog("Task-Creation started...")
    const {task, completionTime} = req.body;

    if(!task || !completionTime){
      Applog("Incomplete Data request Rejected")
      res.status(400).json(new apiError(400,"Incomplete Data"))
      return
    }

    const dueDate = completionTime ? new Date(completionTime) : null

    const obj={
      task,
      completionTime : dueDate,
      user:req.user._id
    }

    await Task.create(obj);
    Applog("Task created Succesfully")
    const taskData = await Task.find({user:req.user._id})
    return res.status(201).json(new apiResponse(201,"Task created Succesfully",taskData))
  } catch (error) {
    Errorlog(error)
    return res.status(500).json(new apiError(500,"error in create task",error))
  }
}

async function getTaskUser(req,res){
  try {
    Applog("Checking if the user exists")
    if(!await User.findById(req.user._id)){
      Applog("User not found")
      return res.status(401).json(new apiError(401,"User Not Found"))
    }

    const status = req.query;
    let query =  {user:req.user._id}

    switch(status){
      case "completed":
        query.completed=true
        break;
      case "pending":
        query.completed=false
        break;
      case "completed-intime":
        query.completed=true
        query.inTime=true
        break;
      default:
        break;
    }

    Applog("Getting all task's of User....")
    const taskData = await Task.find(query);
    Applog("Task's got returning")
    return res.status(200).json(new apiResponse(200,"tasks got",taskData))


     
  } catch (error) {
    Errorlog(error)
    return res.status(500).json(new apiError(500,"error in getTaskUser",error))
  }
}

async function updateTask(req,res){
  try {
    const id = req.params;

    Applog("Checking if the user exists")
    if(!await User.findById(req.user._id)){
      Applog("User not found")
      return res.status(401).json(new apiError(401,"User Not Found"))
    }

    const {task,completed,completionTime} = req.body;
    Applog("Checking whether task exists and user is authorized or not")
    const taskFetched=await Task.findOne({_id:id,user:req.user._id})
    if(!taskFetched){
      Applog("User is unauthorized or task does not exists")
      return res.status(404).json(new apiError(404,"No Task Found or unauthorized"))
    }

    let updates = {};
    if(task) updates.task = task;
    if(completed){
      updates.completed = completed
      if(taskFetched.completionTime >= new Date.now()){
        updates.inTime=true
      }else{
        updates.inTime=false
      }
    }
    if(completionTime){
      updates.completionTime=new Date(completionTime)
    }
    Applog("Updating the task data")
    await Task.findByOneAndUpdate({
      _id:id,
      user:req.user._id
    },{
      $set : updates
    },{runValidators:true});

    const taskData = await Task.findById(id)
    Applog("Updation completed")

    return res.status(200).json(new apiResponse(200,"Data Updated",taskData))

    

  } catch (error) {
    Errorlog(error)
    return res.status(500).json(new apiError(500,"error in updateTask",error))
  }
}

async function deleteTask(req,res){
  try{
    const id = req.params;

    Applog("Checking if the user exists")
    if(!await User.findById(req.user._id)){
      Applog("User not found")
      return res.status(401).json(new apiError(401,"User Not Found"))
    }
    Applog("Checking if Task is valid or not")
    const task = await Task.findOne({_id:id,user:req.user._id})

    if(!task){
      Applog("Unauthorized User or Task not available")
      return res.status(401).json(new apiError(401,"Unauthorized User or Task not available"))
    }

    await Task.findByIdAndDelete(id);
    Applog("Task deleted Succesfully")
    return res.status(200).json(new apiResponse(200,"Task Deleted"))

  }catch(error){
    Errorlog(error)
    return res.status(500).json(new apiError(500,"Error in deletTask",error))
  }

}

async function getTaskAdmin(req,res){
  try {
    Applog("Checking if the user exists")
    const user = await User.findById(req.user._id)
    if(!user || user.role!="admin"){
      Applog("User not found")
      return res.status(401).json(new apiError(401,"User Not Found"))
    }

    const status = req.query;
    let query =  {}

    switch(status){
      case "completed":
        query.completed=true
        break;
      case "pending":
        query.completed=false
        break;
      case "completed-intime":
        query.completed=true
        query.inTime=true
        break;
      default:
        break;
    }

    Applog("Getting all task's of User....")
    const taskData = await Task.find(query);
    Applog("Task's got returning")
    return res.status(200).json(new apiResponse(200,"tasks got",taskData))


     
  } catch (error) {
    Errorlog(error)
    return res.status(500).json(new apiError(500,"error in getTaskUser",error))
  }
}


module.exports={
  createTask,
  getTaskUser,
  updateTask,
  deleteTask,
  getTaskAdmin
}