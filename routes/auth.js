require('dotenv').config();
const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE

router.post("/signup", async (req, res) =>{
  const data =req.body; 
  const saltRounds = 10;
    try{
      const password = data.password;
      // this will do saltgeneration + hashing of password.
      const secPass = bcrypt.hashSync(password, saltRounds);
      const exists =await User.findOne({"email":data.email})
      if(exists && data?.source!=="google"){
        return res.send({success: "false", data: "email already in use"})
      }

      if(exists && data?.source==="google"){ // log in with google
        // console.log("log in with google")
        const accessData = {
          "user":{
              id: exists.id
          }
        }
        var authtoken = jwt.sign(accessData, SECRET_SIGNATURE);
        return res.send({success: "true", authtoken})
      }else{
        // console.log("sign up with google / new register")
        let newUser = await User.create({
          name:data.name,
          email:data.email,
          password:secPass,
          source:data?.source
        })
        const accessData = {
          "user":{
              id: newUser.id
          }
        }
        var authtoken = jwt.sign(accessData, SECRET_SIGNATURE);
        return res.send({success: "true", authtoken});
      } 
    }catch(error){
      res.send({success: "false", data: error.code})
    }
})

router.post("/signin", async (req, res) =>{
    const data = req.body; 
    try{
      const singleUser = await User.findOne({"email":data.email}); 
      if(!singleUser){
        res.send({success: "false", data: "user not found"})
      }
      if(singleUser?.source !=="google"){
        const match =  bcrypt.compare(data.password, singleUser.password);
        if(!match){
          res.send({success: "false", data: "user not found"})
        }
      }
      const accessData = {
        "user":{
            id: singleUser.id
        }
    }
      var authtoken = jwt.sign(accessData, SECRET_SIGNATURE);
      res.send({success: "true", authtoken});
    }catch(error){
      res.send({success: "false", data: error.code})
    }
})

router.post('/getuser', fetchUser, async (req, res)=>{
    try{
        let userId = req.user.id; 
        const data = await User.findById(userId).select("-password"); 
        res.send({success: "true", data})
      }catch(e){
        res.send({success: "false", data:"User not found"})
      }
})

module.exports = router; 

