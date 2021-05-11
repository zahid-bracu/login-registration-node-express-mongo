const express = require('express');
const router=express.Router();
const bcrypt=require('bcryptjs'); // BcryptJS import for password hashing
const path=require('path'); // path import 
require('dotenv').config();
require('./conn'); 
const Register=require('./model');
const {createToken}=require('./token');




// register file setup
router.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/register.html'));
})

router.get('/secret', (req,res)=>{
    console.log(`Token : ${req.cookies.jwt}`);
    if(req.cookies.jwt){
        res.sendFile(path.join(__dirname,'public/secret.html'));
    }else{
        res.sendFile(path.join(__dirname,'public/index.html'));
    }
    
})


// submitting register form
router.post('/submit', async function(req, res){
    // password hash
    const password= await bcrypt.hash(req.body.password,12);
    
    // checking the email already existied or not
    const existedData=await Register.find({email:req.body.email});
    

    
    // if already existed
    if(existedData.length>0){
        res.status(202).send({"message":"The Email Address Already Resgistered"});
    }else{
        // if not existed
        try{

            // set to the schema
            const registerEmployee=new Register({
                name:req.body.name,
                email:req.body.email,
                password:password
              })

            //token generate
              const token = await createToken(registerEmployee._id);
            //token is being saved in collection object
              registerEmployee.tokens=registerEmployee.tokens.concat({token:token});
              const registered=await registerEmployee.save();

            //setup cookie
              res.cookie('jwt',token)

            //data send
              res.send("worked");
        }catch{
            res.send("problems")
        }
    }
        
  });



//   login
router.get('/login',async function(req,res){
    res.sendFile(path.join(__dirname,'public/login.html'));
})


//   login 
router.post('/loginSubmit',async (req,res)=>{
    try{

        // find the inserted email
        var result=await Register.findOne({email:req.body.email});
        var tempArray=result.tokens;
        //console.log(tempArray);


        // if email not found
        if(result==null){
            res.status(204).send("mail not found");
        }else{
            
            
            // using bcryptjs to verify the password
            const passwordMatch= await bcrypt.compare(req.body.password,result.password);


            
            

            // passowrd matching
            if(passwordMatch){
                const token = await createToken(result._id); //generate token
                const employeeLogin =new Register({}); //generating new id for the tokens
                employeeLogin.tokens=employeeLogin.tokens.concat({token:token}); // save the token with the id
                const newArray=[...tempArray,employeeLogin.tokens[0]]; // copy all the previous token with new token
                // now updating token array in database
                var updateResult=await Register.updateOne({email:req.body.email}, { tokens: newArray });
                res.cookie("loginJWT",token,{
                    expires:new Date(Date.now()+50000),
                    httpOnly:true
                }); //saving token in cookies
                res.status(202).send("Ok");
                
            }else{
                res.status(203).send("Not Ok")
            }
        }
        
    }catch{

    }
})


module.exports={router};