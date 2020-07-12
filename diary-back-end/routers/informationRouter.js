const express = require('express');
const informationRouter = express.Router();
const {getInformation, updateMood} = require('../databaseQueries');

informationRouter.get('/getCurrentInfo', async(req,res) => {
    const uuid = req.query.uuid;
    const date = req.query.date;
    const result = await getInformation(uuid, date);
    res.json(result);
});

informationRouter.post('/updateMood', async(req,res) => {
    let {uuid,date,moodIndex} = req.body;
    moodIndex++;
    const result = await updateMood(uuid, date, moodIndex);
    res.json({response: result});
});

module.exports = informationRouter;