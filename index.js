//configure enviornment variables
require('dotenv').config();
//intializing app
const express = require("express");
const { Applog } = require('./Services/log')
const helmet = require('helmet')
const xssClean = require('xss-clean');
// db Connection
const conectionDatabase = require('./connection')
//MiddleWares
const cookieParser = require("cookie-parser");
const checkToken = require("./Midelware/auth");

//Routes
const AuthRoute = require('./Route/authRoute')
const TaskRoute = require('./Route/taskRoute');
const cleanTask = require('./Services/cleanTask');

const app = express();

//middlewares in use
app.use(express.json());
app.use(helmet()); // used to secure headers
app.use(xssClean()); // remove script tags and xss payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));






app.use('/api/v1/register', AuthRoute);
app.use('/api/v1/task', TaskRoute);

const TIME_INTERVAL = 5 * 60 * 60 * 1000;
let cleanInt = null;

conectionDatabase();
let server = app.listen(3000, () => {
  Applog("Server Started")
  cleanTask();
  cleanInt = setInterval(cleanTask, TIME_INTERVAL);
})



// -------- Gracefull ShutDown ------------

const gracefulShutdown = () => {
  Applog("......Server Shutting Down.......")
  if (cleanInt) {
    clearInterval(cleanInt);
    Applog("Task Cleaning interval Cleared")
  }
  if (server) {
    server.close(() => {
      Applog("Http server closed.")
      process.exit(0);
    })

  } else {
    process.exit(0)
  }
}
process.on('SIGINT', gracefulShutdown);  
process.on('SIGTERM', gracefulShutdown); 