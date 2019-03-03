var exports = module.exports = {}

exports.addSlot = function(req, res, models) {
    models.slots.create({  
        userID: req.user.id,
        timeTypeID: req.body.timeTypeID,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      })
      .then(newslot => {
        console.log(`New slot woo`);
      });
}

exports.addTimeType = function(req, res, models) {
    models.timeType.create({  
        userID: req.user.id,
        typeName: req.body.typeName,
        typeDescription: req.body.typeDescription,
        typeColour: req.body.typeColour,
        typeIcon: req.body.typeIcon
      })
      .then(newslot => {
        console.log(`New time type woo`);
      });
    }