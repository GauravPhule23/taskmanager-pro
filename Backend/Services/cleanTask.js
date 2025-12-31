const Task = require("../Model/task");
const {Applog,Errorlog} = require('./log')

async function cleanTask() {

  try {
    Applog("Cleaning the task whose time has passed")
    const currentTime = new Date();
    const result = await Task.updateMany(
      {
        completed: false,
        inTime: null,
        completionTime: { $lt: currentTime } // Less Than Current Time
      },
      { 
        $set: { inTime: false } 
      }
    );
    console.log(result)
    Applog("Cleaning Completed")
    
  } catch (error) {
    Errorlog("Error in cleaning the tasks \n"+error)
  }

}

module.exports=cleanTask