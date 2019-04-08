var moment  = require('moment');
var exports = module.exports = {}

exports.dashboard = function(req, res, models) {
  var posts = models.slots.findAll({
    where: { userId: req.user.id },
    include: [{
      model: models.timeType,
      include: [
        { model: models.timeTypeGroup }
      ]
    },
  ],
  order: [['endTime', 'DESC']],
  //group: [__sequelize.fn('DAY', __sequelize.col('endTime'))]
  }).then(posts => {
    console.log(posts);
    var allEvents = [];
    let icon = "";
    let endDay = "";
    for(var i = 0; i < posts.length; i++)
    {
      icon = posts[i].timeType.typeIcon;
      if(icon == "" || icon == " ") {
        icon = "";
      }
      else{
        icon = "/user/" + posts[i].timeType.typeIcon;
      }

      // get first letters
      var matches = posts[i].timeType.timeTypeGroup.groupTypeName.match(/\b(\w)/g);
      var acronym = matches.join(''); // JSON
      
      // make data nice before sending it to the frontend
      durationCalc = parseFloat(moment.duration(moment(posts[i].endTime).diff(moment(posts[i].startTime))).asHours().toFixed(1));
      endDay = moment(posts[i].endTime).format("DD/MM/YYYY");
      var thisEvent = { 
        "typeName": posts[i].timeType.typeName,
        "description": posts[i].description, 
        "startTime":posts[i].startTime, 
        "endTime":posts[i].endTime,
        "typeID": posts[i].timeType.id,
        "durationHyphenated": moment(posts[i].startTime).format('hh:mm a') + " - " + moment(posts[i].endTime).format('hh:mm a'),
        "durationHours": durationCalc,
        "durationHoursWording": (durationCalc == 1) ? "hour" : "hours", // nice ternary to get plural correct
        "typeIcon": icon,
        "typeColour": posts[i].timeType.typeColour,
        "groupTypeName": posts[i].timeType.timeTypeGroup.groupTypeName,
        "groupTypeAcronym": acronym,
      };

      allEvents.push(thisEvent);
    }
    res.render('dashboard', {allEvents: allEvents});
  });

}

exports.getBreakdown= function(req, res, models) {
  var posts = models.slots.findAll({
    where: { userId: req.user.id, timeTypeId: req.query.type },
    include: [{
      model: models.timeType,
      duplicating: false,
      include: [
        { model: models.timeTypeGroup 
        }
      ]
    },
  ],
  }).then(posts => {
    var headerColor;
    var name;
    var groupType;
    var icon;
    var allEvents = [];
    for(var i = 0; i < posts.length; i++)
    {
      // make data nice before sending it to the frontend
      headerColor = posts[i].timeType.typeColour;
      name = posts[i].timeType.typeName;
      groupType = posts[i].timeType.timeTypeGroup.groupTypeName;
      if(icon != " ") {
        icon = "/user/" + posts[i].timeType.typeIcon;
      }
      else{
        icon = "";
      }

      durationCalc = parseFloat(moment.duration(moment(posts[i].endTime).diff(moment(posts[i].startTime))).asHours().toFixed(1));
      var thisEvent = { 
        "typeName": posts[i].timeType.typeName,
        "description": posts[i].description, 
        "startTime":posts[i].startTime, 
        "endTime":posts[i].endTime,
        "durationHyphenated": moment(posts[i].startTime).format('hh:mm a') + " - " + moment(posts[i].endTime).format('hh:mm a'),
        "durationHours": durationCalc,
        "durationHoursWording": (durationCalc == 1) ? "hour" : "hours", // nice ternary to get plural correct
        "typeIcon": icon,
        "typeColour": posts[i].timeType.typeColour,
        "groupTypeName": posts[i].timeType.timeTypeGroup.groupTypeName,
      };
      allEvents.push(thisEvent);
    }
    console.log(posts);
    res.render('breakdown', {allEvents: allEvents, headerColor:headerColor,name:name,groupType:groupType,icon:icon });
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