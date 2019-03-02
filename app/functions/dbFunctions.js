var exports = module.exports = {}

exports.addSlot = function(req, res, models) {
    // console.log(req.user.id)
    // console.log(req.timeTypeID);
    // console.log(req.startTime);
    // console.log(req.endTime);
   
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