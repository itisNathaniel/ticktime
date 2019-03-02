module.exports = function(sequelize, Sequelize) {
    var timeType = sequelize.define('timeType', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        userID: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },

        typeName: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        typeColour: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        typeDescription: {
            type: Sequelize.STRING,
        },
 
        typeIcon: {
            type: Sequelize.STRING,
        },
 
    });
 
    return timeType;
 
}