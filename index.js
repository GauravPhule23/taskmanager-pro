//configure enviornment variables
require('dotenv').config();
//intializing app
const express = require("express");
const {Applog} = require('./Services/log')
// db Connection
const conectionDatabase = require('./connection')





const app = express();




app.listen(3000,()=>{
  Applog("Serves Started")
  conectionDatabase();
})