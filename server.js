const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT  || 4000; //Line 3
// const port = 4000;
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')
const models = require('./models/models');
const user = models.user;


var mongoDB = "mongodb+srv://root_user:root_user@cluster0.ud5re.mongodb.net/monthly_budget"
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use( express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

makeid = (length)=>{
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

get_phash =(salt, password) =>{
  /*Insert Hashing code here*/
  return password;
}

console.log(makeid(5));

// create a GET route
app.get('*', (req, res) => {
  filePath = path.join(__dirname, 'build', 'index.html');
  res.sendFile(filePath);

});


app.get('/expense_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11


app.post('/postUserData', (req, res) => {
  console.log(req.body);
  new_user = new user({
    firstname: req.body.first_name,
    lastname : req.body.last_name,
    emailid: req.body.email,
    dob : req.body.dob, 
    salt: makeid(5),
    phash: req.body.password
  });
  new_user.save(function (err) {
    if (err){
      console.log(err);
      return handleError(err);
    } 
  });
  console.log("User Saved Successfully");
  res.end("yes");
})

app.post('/loginuser', (req, res) =>{
  console.log(req.body);
  const query = user.where({emailid: req.body.email})
  query.findOne((err, kitten) =>{
    if(err) return handleError(err);
    if(kitten){
      console.log(kitten);
      if(get_phash(kitten.salt, req.body.password) === kitten.phash){
        res.send({res: "Valid"});
      }
      else{
        res.send({res: "Invalid"});
      }
    }
    else{
      res.send({res: "Invalid"})
    }
  })
})