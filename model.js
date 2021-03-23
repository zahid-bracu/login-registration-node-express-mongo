const mongoose=require('mongoose');

const employessSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

const Register= new mongoose.model('Register',employessSchema);

module.exports=Register;