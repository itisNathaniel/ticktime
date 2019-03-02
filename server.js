var express     = require('express');
var app         = express();
var passport    = require('passport');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var config      = require('config');

// bodyparser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// passport
passport = config.get('passport');
app.use(session({ secret: passport.secretKey}))

app.get('/', function(req,res) {
    res.send('Hello');
});

app.listen(5000,function(error) {
    if(!error)
    {
        console.log("Running in environment: " + process.env.NODE_ENV);
        console.log("We're live on port 5000");
    }
    else console.log(error)
});