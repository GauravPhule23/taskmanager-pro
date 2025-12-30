const express = require("express");
const {Applog} = require('./Services/log')





const app = express();




app.listen(3000,Applog("Serves Started"))