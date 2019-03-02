var tSC = require('../controllers/timeslotcontroller.js');
var tSF = require('../functions/dbFunctions.js');
var auth = require('./auth.js');

module.exports = function(app, models) {
 
    //app.get('/add-slot', isLoggedIn, tSC.addTimeSlot);
    app.get('/add-time-type', isLoggedIn, tSC.addTimeType);

    app.get('/add-slot', function (req,res) {
        
        models.slots.create({  
            userID: '1',
            timeTypeID: '1',
            startTime: '0',
            endTime: '0'
          })
          .then(newslot => {
            console.log(`New slot woo`);
          });
          
        //tSF.addSlot(req,res,app);
        res.redirect('/');
    });


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())   
            return next();        
        res.redirect('/signin');
    }
}

