const mongoose = require('mongoose');

const url="mongodb+srv://demoUser:9augustbd@cluster0.rwjuz.mongodb.net/user-info?retryWrites=true&w=majority"

mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(()=>{
    console.log("Yes Connected")
}).catch((err)=>{
    console.log("Failed Connection ")
})