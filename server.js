const express = require("express");
const app = express();
require("dotenv").config();

//db
const db = require('./db/db');
//parser
app.use(express.json())
//port 
const port = process.env.PORT;

app.listen(port,()=>{ console.log("server is running at port",port) });