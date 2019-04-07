var moment  = require('moment');
var exports = module.exports = {}

exports.dashboard = function(req, res, models) {
  var posts = models.slots.findAll({
    where: { userId: req.user.id },
    include: [{
      model: models.timeType,
      duplicating: false,
      include: [
        { model: models.timeTypeGroup }
      ]
    },
  ],
  }).then(posts => {
    var allEvents = [];
    for(var i = 0; i < posts.length; i++)
    {
      // make data nice before sending it to the frontend
      var durationCalc = moment.duration(moment(posts[i].endTime).diff(moment(posts[i].startTime))).asHours();
      var thisEvent = { 
        "typeName": posts[i].timeType.typeName,
        "description": posts[i].description, 
        "startTime":posts[i].startTime, 
        "endTime":posts[i].endTime,
        "durationHyphenated": moment(posts[i].startTime).format('hh:mm a') + " - " + moment(posts[i].endTime).format('hh:mm a'),
        "durationHours": durationCalc,
        "durationHoursWording": (durationCalc == 1) ? "hour" : "hours", // nice ternary to get plural correct
        "typeIcon": "/userImages/" + posts[i].timeType.typeIcon,
        "typeColour": posts[i].timeType.typeColour,
        "groupTypeName": posts[i].timeType.timeTypeGroup.groupTypeName,
      };
      allEvents.push(thisEvent);
    }
    console.log(posts);
    res.render('dashboard', {allEvents: allEvents});
  });

}

exports.getBreakdown= function(req, res, models) {
  var modelTypes = models.slots.findAll({  
      userID: req.user.id
   }).then(slots => {
      var parentType = models.timeType.findAll({  
          userID: req.user.id
      }).then(parentType => {
          console.log(`Found slots: ${slots.length}`);
          res.render('breakdown', { slots: slots, parentType:parentType });
      });
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