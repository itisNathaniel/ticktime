var exports = module.exports = {}

exports.dashboard = function(req, res, models) {
    var modelTypes = models.slots.findAll({  
        userID: req.user.id
      }).then(slots => {
        console.log(`Found slots: ${slots.length}`);
        res.render('dashboard', { slots: slots });
      });
}

exports.addTimeSlot = function(req, res, models) {
    var modelTypes = models.timeType.findAll({  
        userID: req.user.id
      }).then(timeType => {
        console.log(`Found slots: ${timeType.length}`);
        res.render('add-slot', { timeType: timeType });
      });
}

exports.addTimeType = function(req, res, models) {
    var modelTypes = models.timeTypeGroup.findAll({  
        userID: req.user.id
      }).then(timeTypeGroup => {
        console.log(`Found time types: ${timeTypeGroup.length}`);
        res.render('add-time-type', { timeTypeGroup: timeTypeGroup });
      });
}

exports.addTimeTypeGroup = function(req, res) {
    res.render('add-time-type-group');
}