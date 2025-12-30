//configure enviornment variables
require('dotenv').config();
//intializing app
const express = require("express");
const {Applog} = require('./Services/log')
// db Connection
const conectionDatabase = require('./connection')
//MiddleWares
const cookieParser = require("cookie-parser");
const checkToken = require("./Midelware/auth");


//middlewares in use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));





const app = express();




app.listen(3000,()=>{
  Applog("Server Started")
  conectionDatabase();
})