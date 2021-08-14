const express = require('express'); //Line 1
const app = express(); //Line 2
const port = 4000; //Line 3
// const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();


app.use( express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.static(__dirname+'/build/'));


// create a GET route
app.get('*', (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
});


app.get('/expense_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11


app.post('/postUserData', (req, res) => {
  console.log(req.body);
  res.end("yes");
})