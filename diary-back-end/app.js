require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const authenticationRouter = require('./routers/authenticationRouter');
const informationRouter = require('./routers/informationRouter');
const noteRouter = require('./routers/noteRouter');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/authentication', authenticationRouter);
app.use('/information', informationRouter);
app.use('/note',noteRouter);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});