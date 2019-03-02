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
 
    },
    {
        // Really useful https://lorenstewart.me/2016/10/03/sequelize-crud-101/
        // also https://dzone.com/articles/sequelize-javascript-orm
        classMethods:{
            associate:function(models){
                timeType.belongsTo(models.user, { foreignKey: 'id'});
                timeType.hasMany(models.slots, { foreignKey: 'timeTypeID'} );
            }
        }
    }
    
    
    );
 
    return timeType;
 
}