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

        startTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },
 
        endTime: {
            type: Sequelize.DATE,
            notEmpty: true,
        },
    },
    {
        classMethods:{
            associate:function(models){
                slots.belongsTo(models.user,{ foreignKey: 'id'});
            }
        }
    }
 
    )
 
    return Slots;
 
}