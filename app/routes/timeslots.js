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
    app.get('/user/:file', isLoggedIn, function(req, res, next) {
        // stop traversing
        var safeSuffix = path.normalize(req.params.file).replace(/^(\.\.(\/|\\|$))+/, '');
        var safeJoin = path.join(__basedir, 'userData/' + req.user.id + "/uploads", safeSuffix);
        app.use('/', express.static(safeJoin));
        res.sendFile(safeJoin);
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
        let icon = " ";
        let fileName = "";
        if(req.files != null)
        {   
            icon = req.files.icon;
            // validate type - needs work
            if (icon.name.includes(".png"))
            {
                fileName = moment().format('YYYY-MM-DD-HHmmss') + ".png"; 
                let path = __basedir + "/userData/" + req.user.id + "/uploads/" + fileName;

                icon.mv(path, function(err) {
                    if (err)
                        return res.render('pages/error');
                    }
                );
            }
        }

        databaseFunctions.addTimeType(req,res,models, fileName);
        res.redirect('/');

    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

