var exports = module.exports = {}

exports.addTimeSlot = function(req, res, models) {
    var modelTypes = models.timeType.findAll({  
        userID: req.user.id
      }).then(timeType => {
        console.log(`Found user: ${timeType.length}`);
        res.render('add-slot', { timeType: timeType });
      });
}

exports.addTimeType = function(req, res) {
    res.render('add-time-type');
}