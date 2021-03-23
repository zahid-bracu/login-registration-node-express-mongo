const jwt =require('jsonwebtoken');

const createToken= async (value) =>{
    
    const token = await jwt.sign({value},'qotyrhepas');
    return token;

}

module.exports={createToken};