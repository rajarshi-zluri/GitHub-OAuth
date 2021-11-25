require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('static'));
app.use('/', require('./routes/index'));

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(`An error occured in starting the server ${err}`);
    }else {
        console.log(`Server is up and running on port ${process.env.PORT}`);
    }
});