const { nanoid } = require("nanoid");
const URL  = require('../models/url'); 

async function handleGenerateNewShortURL(req,res){

    const body = req.body;
    console.log(body);
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],

    })
    return res.json({id:shortID});
}


async function handleGetAnalytics(req,res){
    console.log(req);
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({totalClicks : result.visitHistory.length});
}

module.exports = {
    handleGenerateNewShortURL,handleGetAnalytics,
}