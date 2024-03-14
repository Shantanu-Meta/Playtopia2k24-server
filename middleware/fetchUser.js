// MIDDLEWARES to fetch payload and verify with signsture.
var jwt = require('jsonwebtoken');
const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE;

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token'); 
    if(!token){
        return res.send({success:"false", data:"Unauthoprized access"});
    }

    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        req.user = data.user;
        next(); 
    }catch(e){
        return res.send({success:"false", data:"Unauthoprized access"});
    }
}

module.exports = fetchUser; 