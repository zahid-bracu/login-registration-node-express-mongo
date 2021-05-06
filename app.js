const express=require('express'); //express import
const app=express(); // app create from express
const bcrypt=require('bcryptjs'); // BcryptJS import for password hashing
const path=require('path'); // path import
var cors = require('cors')
require('dotenv').config() // dot env importing to hide secret data

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(cors())

require('./conn'); // connection file import and execute
const Register=require('./model'); // schema file import and execute
const {createToken}=require('./token'); // file import for create token
const port = process.env.PORT || 9000; // port set


app.use(express.json());
app.use(express.urlencoded({ extended: false })); //must import 
app.use(express.static(path.join(__dirname,'public')))  //set the default file --> index.html
const {router} =require('./router');

// using all routers
app.use(router);
 
//  app is listening to the port
app.listen(port, ()=>{
    console.log("Server is running at "+port);
})