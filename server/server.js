const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require('./routes/user.route')

//db
const db = require('./db/db');
//parser
app.use(express.json())
//port 
const port = process.env.PORT;

app.use('',userRoute);
app.listen(port,()=>{ console.log("server is running at port",port) });