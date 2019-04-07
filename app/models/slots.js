module.exports = function(sequelize, Sequelize) {
    var Slots = sequelize.define('slots', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        // timeTypeID: {
        //     type: Sequelize.INTEGER,
        //     notEmpty: true,
        // },

        startTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },
 
        endTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },

        description: {
            type: Sequelize.TEXT,
        },
    },
 
    ) 
    return Slots;
 
}