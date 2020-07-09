const express = require('express');
const appRouter = express.Router();
const { 
    checkUsername,
    registerUser,
    loginUser } = require('./databaseQueries');
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

module.exports = appRouter;