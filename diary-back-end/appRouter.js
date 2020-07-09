const express = require('express');
const appRouter = express.Router();
const { 
    checkUsername,
    registerUser,
    loginUser,
    getInformation,
    updateMood } = require('./databaseQueries');
const { sha512 } = require('js-sha512');

appRouter.post('/checkUsername', async (req,res) => {
    const username = req.body.username;
    const result = await checkUsername(username);
    res.json(result);
});

appRouter.post('/register', async(req,res) => {
    const {username, password} = req.body;
    hashedPassword = sha512(password);
    const result = await registerUser(username, hashedPassword);
    res.json({result});
});

appRouter.post('/login', async(req,res) => {
    const {username, password} = req.body;
    const hashedPassword = sha512(password);
    const uuid = await loginUser(username, hashedPassword)
    res.send({key:uuid});
});

appRouter.get('/getCurrentInfo', async(req,res) => {
    const uuid = req.query.uuid;
    const date = req.query.date;
    const result = await getInformation(uuid, date);
    res.json(result);
});

appRouter.post('/updateMood', async(req,res) => {
    let {uuid,date,moodIndex} = req.body;
    moodIndex++;
    const result = await updateMood(uuid, date, moodIndex);
    res.json({response: result});
});

module.exports = appRouter;