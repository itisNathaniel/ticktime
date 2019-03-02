var tSC = require('../controllers/timeslotcontroller.js');
var tSF = require('../functions/dbFunctions.js');
var auth = require('./auth.js');

module.exports = function(app, models) {
 
    app.get('/add-slot', isLoggedIn, tSC.addTimeSlot);
    app.get('/add-time-type', isLoggedIn, tSC.addTimeType);

    app.post('/add-slot',isLoggedIn, function (req,res) {  
        tSF.addSlot(req,res,models);
        res.redirect('/');
    });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

