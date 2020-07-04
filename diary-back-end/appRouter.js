const express = require('express');
const appRouter = express.Router();

appRouter.get('/',(req,res) => {
    res.send("<h1>Hello</h1>");
});

module.exports = appRouter;