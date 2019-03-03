var tSC = require('../controllers/timeslotcontroller.js');
var tSF = require('../functions/dbFunctions.js');
var auth = require('./auth.js');

module.exports = function(app, models) {
 
    // GET
    app.get('/dashboard',isLoggedIn, function (req,res) { 
        tSC.dashboard(req,res,models);
    });

    app.get('/add-slot', isLoggedIn, function (req,res) { 
         tSC.addTimeSlot(req,res,models);
    });
    app.get('/add-time-type', isLoggedIn, function (req,res) { 
        tSC.addTimeType(req,res,models);
    });
    app.get('/add-time-type-group', isLoggedIn, tSC.addTimeTypeGroup);

    // POST
    app.post('/add-slot',isLoggedIn, function (req,res) {  
        tSF.addSlot(req,res,models);
        res.redirect('/');
    });
    app.post('/add-time-type-group',isLoggedIn, function (req,res) {  
        tSF.addTimeTypeGroup(req,res,models);
        res.redirect('/');
    });
    app.post('/add-time-type',isLoggedIn, function (req,res) {  
        tSF.addTimeType(req,res,models);
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

