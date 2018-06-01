const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const main = require('./controllers/main');

//Initialize our app variable
const app = express();

//Declaring Port
const port = 3000;

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/main', main);




app.listen(port, () => {
    console.log('Listening on port ' + port)
})