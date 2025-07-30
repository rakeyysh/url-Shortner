const express = require("express");
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const mongoose = require("mongoose");



const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001;



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/url',urlRoute);
app.use("/",staticRoute);




connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{
     console.log("MongoDB connected");
        
})





// console.log(req);
app.get('/url/:shortID',async(req,res)=>{
    const shortID = req.params.shortID;
  const entry =  await URL.findOneAndUpdate({
        shortID,
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now()},
        }
    })
    console.log(entry);
    res.redirect(entry.redirectURL);
})


app.listen(PORT,()=>{
    console.log(`Server Started at PORT : ${PORT}`);
})