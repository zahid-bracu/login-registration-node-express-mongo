const mongoose=require('mongoose');

const employessSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    }
})

const Register= new mongoose.model('Register',employessSchema);

module.exports=Register;