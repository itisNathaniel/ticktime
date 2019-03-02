module.exports = function(sequelize, Sequelize) {
    var Slots = sequelize.define('slots', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        userID: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },

        timeTypeID: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        startTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },
 
        endTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },

        endTime: {
            type: Sequelize.STRING,
        },
 
    });
 
    return Slots;
 
}