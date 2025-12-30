const fs = require("fs")
const path = require('path')

function Applog(message){
  console.log()
  fs.appendFile(path.join(__dirname,'../logs/app.log'),`${new Date().toISOString()} - ${message}\n`,(err)=>{
    if(err){
      console.log(err)
    }
    
  })
}

function Errorlog(message){
  console.log()
  fs.appendFile(path.join(__dirname,'../logs/error.log'),`${new Date().toISOString()} - ${message}\n`,(err)=>{
    if(err){
      console.log(err)
    }
    
  })
}

module.exports={Applog,Errorlog};