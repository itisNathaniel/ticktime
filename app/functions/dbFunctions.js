var exports = module.exports = {}

exports.addSlot = function(req, res, app) {
    // console.log(req.user.id)
    // console.log(req.timeTypeID);
    // console.log(req.startTime);
    // console.log(req.endTime);
   
    var Slots = app.get('models').slots;
    var slot = Slots.build({
            //     userID: '1',
    //     timeTypeID: '1',
    //     startTime: '0',
    //     endTime: '0'
    //console.log(User);
    //var console.log(User);
    //models.sequelize.
    // Slots.create({  
    //     userID: '1',
    //     timeTypeID: '1',
    //     startTime: '0',
    //     endTime: '0'
    //   })
    //   .then(newdata => {
    //   });
})
}