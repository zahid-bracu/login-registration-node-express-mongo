const express=require('express');
const app=express();

const bcrypt=require('bcryptjs');
const port = process.env.PORT || 9000;
const path=require('path');
require('./conn');
const Register=require('./model');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use(express.static(path.join(__dirname,'public'))) 

 

 

app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/register.html'));
})


app.post('/submit', async function(req, res){
    const password= await bcrypt.hash(req.body.password,12);
    console.log(password)
      console.log(req.body)
        try{
            const registerEmployee=new Register({
                name:req.body.name,
                email:req.body.email,
                password:password
              })
              console.log(registerEmployee);
              const registered=await registerEmployee.save();
              
              res.send("worked");
              
              console.log("Saved");
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
        console.log(result.password);
        const passwordMatch= await bcrypt.compare(req.body.password,result.password);
        console.log(passwordMatch);

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