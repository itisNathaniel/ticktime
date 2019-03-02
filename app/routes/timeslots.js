var tSC = require('../controllers/timeslotcontroller.js');
var tSF = require('../functions/dbFunctions.js');
var auth = require('./auth.js');

module.exports = function(app, passport) {
 
    app.get('/add-slot', isLoggedIn, tSC.addTimeSlot);
    app.get('/add-time-type', isLoggedIn, tSC.addTimeType);

    app.post('/add-slot', function (req,res) {
        //console.log(req.body);
        tSF.addSlot(req,res);
        res.redirect('/');
    });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

