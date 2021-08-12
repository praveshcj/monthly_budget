const express = require('express');
const mongoose = require('mongoose');
const models = require('./models/models');
// set up our express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ourdata');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// app.use(express.json());s
// initialize routes
// app.use('/api',require('./router/api'));

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 5000, function(){
    console.log('Ready to Go!');
});