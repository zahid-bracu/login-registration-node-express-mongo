const jwt =require('jsonwebtoken');
const path=require('path'); // path import 
const createToken= async (value) =>{
    
    const token = await jwt.sign({value},process.env.key);
    return token;

}


const verifyToken =(req,res,next)=>{
    try{
        const token=req.cookies.loginJWT; 
        const verifyUser=jwt.verify(token,process.env.key);
        console.log(verifyUser.value);
        next();
    }catch(err){
        res.sendFile(path.join(__dirname,'public/index.html'));
    }
}

module.exports={createToken,verifyToken};