const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require('./routes/user.route')
const expenseRoute = require('./routes/expense.route');
const cors = require('cors');

//db
const db = require('./db/db');
//parser
app.use(express.json())
app.use(cors({origin:"*"}))
//port 
const port = process.env.PORT;

app.use('',userRoute);
app.use('',expenseRoute)
app.listen(port,()=>{ console.log("server is running at port",port) });