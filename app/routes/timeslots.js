var timeSlotController  = require('../controllers/timeslotcontroller.js');
var databaseFunctions   = require('../functions/dbFunctions.js');
var auth                = require('./auth.js');
var path                = require('path');
var fs                  = require('fs');
var moment              = require('moment');

module.exports = function(app, models, express) {

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


    // allow user to access own folder
    app.get('/userImages/', isLoggedIn, function(req, res, next) {
        app.use('/userImages', express.static(path.join(__basedir, 'userData/' + req.user.id + "/uploads")));
        res.send('');
    });

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
        var fileName = moment().format('YYYY-MM-DD-HHmmss') + ".png"; 
        let icon = req.files.icon;
        let path = __basedir + "/userData/" + req.user.id + "/uploads/" + fileName;
        icon.mv(path, function(err) {
          if (err)
            return res.render('pages/error');
        });

        databaseFunctions.addTimeType(req,res,models, fileName);
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

