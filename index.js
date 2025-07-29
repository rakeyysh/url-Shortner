const express = require("express");
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');


const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001;

app.use(express.json());


connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{
    console.log("MongoDB connected");
})
app.use('/url',urlRoute);
// console.log(req);
app.get('/:shortID',async(req,res)=>{
    const shortID = req.params.shortID;
  const entry =  await URL.findOneAndUpdate({
        shortID,
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now()},
        }
    })
    res.redirect(entry.redirectURL);
})


app.listen(PORT,()=>{
    console.log(`Server Started at PORT : ${PORT}`);
})