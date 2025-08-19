const {getUser} = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){

    console.log("its running");
   console.log("Authorization",req.headers['authorization']);

   //const userUid = req.cookies.uid;
    
    

    const userUid = req.headers["authorization"];
    if(!userUid) return res.redirect("/login");
    if(!userUid) return res.status(401).json({ error: "No authorization header" })
;
    
  //  console.log("middleware 1",userUid);
    const token = userUid.split('Bearer ')[1]; // "Bearer [23412u12uksha]"
    
    

   //console.log("cookies after login",req.cookies);
   //console.log("middleware 2",userUid);
   const user = getUser(token);
   //const user = getUser(userUid);
   //console.log("user 1",user);
   
    if(!user) return res.redirect("/login");
    

    console.log("user 2",user);  // returns a payload data
   // req.user = user;
    next();
}






module.exports={restrictToLoggedinUserOnly};