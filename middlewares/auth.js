const {getUser} = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){

    console.log("its running");
    
    
    console.log("cookies 1",req.cookies);
    const userUid = req.cookies.uid;
    console.log("middleware 1",userUid);
    
    if(!userUid) return res.redirect("/login");

   console.log("cookies after login",req.cookies);
   //console.log("middleware 2",userUid);
   const user = getUser(userUid);
   //console.log("user 1",user);
   
    if(!user){res.clearCookie("uid"); 
        return res.redirect("/login");
    }

    console.log("user 2",user);  // returns a payload data
   // req.user = user;
    next();
}






module.exports={restrictToLoggedinUserOnly};