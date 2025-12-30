//configure enviornment variables
require('dotenv').config();
//intializing app
const express = require("express");
const {Applog} = require('./Services/log')
const helmet = require('helmet')
const xssClean = require('xss-clean');
// db Connection
const conectionDatabase = require('./connection')
//MiddleWares
const cookieParser = require("cookie-parser");
const checkToken = require("./Midelware/auth");

//Routes
const AuthRoute = require('./Route/authRoute')
const TaskRoute = require('./Route/taskRoute')


//middlewares in use
app.use(express.json());
app.use(helmet()); // used to secure headers
app.use(xssClean()); // remove script tags and xss payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));





const app = express();

app.use('/api/v1/register',AuthRoute);
app.use('/api/v1/task',TaskRoute);


app.listen(3000,()=>{
  Applog("Server Started")
  conectionDatabase();
})