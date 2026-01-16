const mongoose = require('mongoose');
const mongodb_url = process.env.MONGODB_URL;
//db connect
mongoose.connect(mongodb_url);

const db = mongoose.connection;
db.on('connected',()=>{console.log("db connected")})
.on('error',()=>{console.log("db error")})
.on('disconnected',()=>{console.log("db dis-connected")})

module.exports = db ;
