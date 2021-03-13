const express=require('express');
const app=express();

const port = process.env.PORT || 9000;
const path=require('path');
require('./conn');
const Register=require('./model');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use(express.static(path.join(__dirname,'public'))) 

 

app.post('/register',(req,res)=>{

    console.log(req.body)
})

app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/register.html'));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/login.html'));
})



app.listen(port, ()=>{
    console.log("Server is running at "+port);
})