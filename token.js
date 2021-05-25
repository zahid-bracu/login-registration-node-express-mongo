const jwt =require('jsonwebtoken');
const path=require('path'); // path import 
const Register=require('./model');
const createToken= async (value) =>{
    
    const token = await jwt.sign({value},process.env.key);
    return token;

}


const verifyToken = async (req,res,next)=>{
    try{
        const token=req.cookies.loginJWT; 
        const verifyUser=jwt.verify(token,process.env.key);
        const user=await Register.find({_id:verifyUser.value});
        console.log(verifyUser);
        console.log(user[0].name);
        next();
    }catch(err){
        res.sendFile(path.join(__dirname,'public/index.html'));
    }
}

module.exports={createToken,verifyToken};