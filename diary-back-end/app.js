require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const appRouter = require('./appRouter.js');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', appRouter);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});