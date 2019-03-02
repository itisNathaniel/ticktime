var exports = module.exports = {}
 
exports.addSlot = function(req) {
    console.log(req.user.id)
    console.log(req.timeTypeID);
    console.log(req.startTime);
    console.log(req.endTime);

}