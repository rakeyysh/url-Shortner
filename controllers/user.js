const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const { setUser} = require("../service/auth")

async function handleUserSignUp(req,res){
    const  { name, email, password} = req.body;
   // console.log(req.body);
    await User.create({
        name,
        email,
        password,

    });

    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const  {  email, password} = req.body;
   const user = await User.findOne({ email,password});
    if(!user) return({ error: "Invalid Username or Password"})
    
    
   
  
    //  console.log("from login controller:",sessionId);
     const token = setUser(user);
     
     console.log("token",token);
     res.cookie("uid",token);
   
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp, handleUserLogin,
}