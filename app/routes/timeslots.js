var tSC = require('../controllers/timeslotcontroller.js');
var auth = require('./auth.js');

module.exports = function(app, passport) {
 
    app.get('/add-slot', isLoggedIn, tSC.addTimeSlot);
    app.get('/add-time-type', isLoggedIn, tSC.addTimeType);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

