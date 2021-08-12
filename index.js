const express = require('express');
const mongoose = require('mongoose');
const models = require('./models/models');
// set up our express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb+srv://root_user:root_user@cluster0.ud5re.mongodb.net/monthly_budget');
mongoose.Promise = global.Promise;


/* Test Data Saving*/
// const test_data = new models.user(({
//     username: 'test_user', 
//     firstname: 'test', 
//     lastname: 'user', 
//     dob: Date.now(),
//     salt: 'lol',
//     phash: 'lol',
//     defaultcurrency: 'INR'
// }))

// test_data.save();
console.log("Saved")

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