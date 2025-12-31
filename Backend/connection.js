const mongoose = require("mongoose");
const { Applog, Errorlog } = require("./Services/log");

async function conectionDatabase(){
 await mongoose.connect(process.env.MONGODB_URI).then(()=>{
  Applog("MongoDB connected..")
}).catch((e)=>{
  Errorlog("Error in connecting Mongodb");
})
}

module.exports=conectionDatabase