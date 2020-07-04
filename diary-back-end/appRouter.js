const express = require('express');
const appRouter = express.Router();
const { checkUsername } = require('./databaseQueries');

appRouter.post('/checkUsername', async (req,res) => {
    const username = req.body.username;
    const result = await checkUsername(username);
    res.json(result);
});

module.exports = appRouter;