"use strict";
var config      = require('config');
var fs          = require("fs");
var path        = require("path");
var Sequelize   = require("sequelize");
var dbconfig    = config.get('database.connection');
var db          = {};
 

var sequelize   = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
}); 

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// more relationship declaration
sequelize.models.slots.belongsTo(sequelize.models.timeType);
sequelize.models.timeTypeGroup.belongsTo(sequelize.models.user);
sequelize.models.timeType.belongsTo(sequelize.models.timeTypeGroup);


module.exports = db;
