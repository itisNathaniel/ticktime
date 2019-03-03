var exports = module.exports = {}

exports.addSlot = function(req, res, models) {
    models.slots.create({  
        userID: req.user.id,
        timeTypeID: req.body.timeTypeID,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      })
      .then(newslot => {
        console.log(`New slot woo`);
      });
}

exports.addTimeTypeGroup = function(req, res, models) {
    models.timeTypeGroup.create({  
        userID: req.user.id,
        groupTypeName: req.body.typeName,
      })
      .then(newslot => {
        console.log(`New time type group woo`);
      });
    }

exports.addTimeType = function(req, res, models) {
    models.timeType.create({  
        userID: req.user.id,
        groupTypeID: req.body.groupTypeID,
        typeName: req.body.typeName,
        typeDescription: req.body.typeDescription,
        typeColour: req.body.typeColour,
        typeIcon: req.body.typeIcon
      })
      .then(newslot => {
        console.log(`New time type woo`);
      });
    }
