const express = require('express'); //Line 1
const {to} = require('await-to-js');
const app = express(); //Line 2
const port = process.env.PORT  || 4000; //Line 3
// const port = 4000;
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path')
const models = require('./models/models');
const { getJwtToken } = require('./utils/helper');
const user = models.user;


var mongoDB = "mongodb+srv://root_user:root_user@cluster0.ud5re.mongodb.net/monthly_budget"
const jwtPrivateKey = 'sss';
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

app.post('/loginuser', async (req, res) =>{
  const {email, password} = req.body;
  const findQuery = {
    emailid: email,
  };

  const [ err, userData ] = await to(user.findOne(findQuery));
  if(err || !userData) {
    res.status(500);
    res.send('Internal Server Error');
  } else {
    if(get_phash(userData.salt, password) === userData.phash){
      const jwtToken = getJwtToken({ email: userData.emailid }, jwtPrivateKey);
      res.status(200);
      res.send({
        res: "Valid",
        token: jwtToken,
        });
    }
    else{
      res.status(403)
      res.send({res: "Wrong password/email"});
    }
  }
});