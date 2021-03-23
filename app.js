const express=require('express');
const app=express();
const bcrypt=require('bcryptjs');
const path=require('path');

require('./conn');
const Register=require('./model');
const {createToken}=require('./token');
const port = process.env.PORT || 9000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public'))) 

 

 

app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/register.html'));
})


// submitting register form
app.post('/submit', async function(req, res){
    // password hash
    const password= await bcrypt.hash(req.body.password,12);
        try{
            const registerEmployee=new Register({
                name:req.body.name,
                email:req.body.email,
                password:password
              })


                //token generate
              const token = await createToken(registerEmployee._id);
            //   token is being saved in collection object
              registerEmployee.tokens=registerEmployee.tokens.concat({token:token});
              const registered=await registerEmployee.save();
              res.send("worked");
        }catch{
            res.send("problems")
        }
  });



app.get('/login',async function(req,res){
    res.sendFile(path.join(__dirname,'public/login.html'));
})

app.post('/loginSubmit',async (req,res)=>{
    

    try{
        var result=await Register.findOne({email:req.body.email});
         
        const passwordMatch= await bcrypt.compare(req.body.password,result.password);
         

        if(passwordMatch){
            res.status(202).send("Ok")
        }else{
            res.status(203).send("Not Ok")
        }
    }catch{

    }
})



app.listen(port, ()=>{
    console.log("Server is running at "+port);
})