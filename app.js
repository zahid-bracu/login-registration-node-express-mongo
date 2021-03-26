const express=require('express'); //express import
const app=express(); // app create from express
const bcrypt=require('bcryptjs'); // BcryptJS import for password hashing
const path=require('path'); // path import
require('dotenv').config() // dot env importing to hide secret data

require('./conn'); // connection file import and execute
const Register=require('./model'); // schema file import and execute
const {createToken}=require('./token'); // file import for create token
const port = process.env.PORT || 9000; // port set


app.use(express.json());
app.use(express.urlencoded({ extended: false })); //must import 
app.use(express.static(path.join(__dirname,'public')))  //set the default file --> index.html

 

 

// register file setup
app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/register.html'));
})


// submitting register form
app.post('/submit', async function(req, res){
    // password hash
    const password= await bcrypt.hash(req.body.password,12);

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
              res.cookie('jwt',token,{
                  expires:new Date(Date.now()+30000),
                  httpOnly:true
              })

            //data send
              res.send("worked");
        }catch{
            res.send("problems")
        }
  });



//   login
app.get('/login',async function(req,res){
    res.sendFile(path.join(__dirname,'public/login.html'));
})


//   login 
app.post('/loginSubmit',async (req,res)=>{
    try{

        // find the inserted email
        var result=await Register.findOne({email:req.body.email});
        
        // if email not found
        if(result==null){
            res.status(204).send("mail not found");
        }else{
            console.log(req.body.password);
            const token = await createToken(result._id); //generate token

            // using bcryptjs to verify the password
            const passwordMatch= await bcrypt.compare(req.body.password,result.password);

            // set cookie
            res.cookie('jwt',token,{
                expires:new Date(Date.now()+50000),
                httpOnly:true,
                secure:true
            })

            // passowrd matching
            if(passwordMatch){
                res.status(202).send("Ok")
            }else{
                res.status(203).send("Not Ok")
            }
        }
        
    }catch{

    }
})



app.listen(port, ()=>{
    console.log("Server is running at "+port);
})