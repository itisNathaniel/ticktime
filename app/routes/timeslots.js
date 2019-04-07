var timeSlotController = require('../controllers/timeslotcontroller.js');
var databaseFunctions = require('../functions/dbFunctions.js');
var auth = require('./auth.js');

module.exports = function(app, models) {
 
    // GET
    app.get('/',isLoggedIn, function (req,res) { 
        timeSlotController.dashboard(req,res,models);
    });

    app.get('/breakdown',isLoggedIn, function (req,res) { 
        timeSlotController.getBreakdown(req,res,models);
    });

    app.get('/add-slot', isLoggedIn, function (req,res) { 
         timeSlotController.addTimeSlot(req,res,models);
    });
    app.get('/add-time-type', isLoggedIn, function (req,res) { 
        timeSlotController.addTimeType(req,res,models);
    });
    app.get('/add-time-type-group', isLoggedIn, timeSlotController.addTimeTypeGroup);

    // POST
    app.post('/add-slot',isLoggedIn, function (req,res) {  
        databaseFunctions.addSlot(req,res,models);
        res.redirect('/');
    });
    app.post('/add-time-type-group',isLoggedIn, function (req,res) {  
        databaseFunctions.addTimeTypeGroup(req,res,models);
        res.redirect('/');
    });
    app.post('/add-time-type',isLoggedIn, function (req,res) {  
        databaseFunctions.addTimeType(req,res,models);
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

