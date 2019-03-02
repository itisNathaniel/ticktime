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
passportConfig = config.get('passport');
app.use(session({ secret: passportConfig.secretKey,resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//Models
var models = require("./app/models");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

// Pages
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