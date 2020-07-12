const express = require('express');
const { sha512 } = require('js-sha512');
const authenticationRouter = express.Router();
const {checkUsername, registerUser, loginUser} = require('../databaseQueries');

authenticationRouter.post('/login', async(req,res) => {
    const {username, password} = req.body;
    const hashedPassword = sha512(password);
    const uuid = await loginUser(username, hashedPassword)
    res.json({key:uuid});
});

authenticationRouter.post('/checkUsername', async (req,res) => {
    const username = req.body.username;
    const result = await checkUsername(username);
    res.json(result);
});

authenticationRouter.post('/register', async(req,res) => {
    const {username, password} = req.body;
    hashedPassword = sha512(password);
    const result = await registerUser(username, hashedPassword);
    res.json({result});
});

module.exports = authenticationRouter;