var express     = require('express');
var app         = express();
var passport    = require('passport');
var session     = require('express-session');
var bodyParser  = require('body-parser');
var config      = require('config');
var exphbs      = require('express-handlebars');

// Set Global Directory
global.__basedir = __dirname;


// DONT ALLOW THIS TO GO OUT
app.use(express.static('public'))

// bodyparser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// passport
passportConfig = config.get('passport');
app.use(session({ secret: passportConfig.secretKey,resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//Models
app.set('models', require('./app/models'));
var models = app.get('models');

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
var timeSlotsRoutes = require('./app/routes/timeslots.js')(app, models);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    partialsDir: __dirname + '/app/views/partials/'
}));

app.set('view engine', '.hbs');


app.listen(5000,function(error) {
    if(!error)
    {
        console.log("Running in environment: " + process.env.NODE_ENV);
        console.log("We're live on port 5000");
    }
    else console.log(error)
});