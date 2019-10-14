'use strict'
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const config = require('./config')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

const users = require('./routes/users')
const auth = require('./routes/auth');
const webtoons = require('./routes/webtoons')
const episodes = require('./routes/episodes')




mongoose.connect(config.DATABASE_URI, {useNewUrlParser:true,  useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.get('/' , (req, res) => {
    res.send('Hello Database')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.json());

app.use(users);
app.use(auth);
app.use(webtoons)
app.use(episodes)
 
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));