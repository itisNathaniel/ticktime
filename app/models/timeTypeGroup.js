module.exports = function(sequelize, Sequelize) {
    var timeTypeGroup = sequelize.define('timeTypeGroup', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        userID: {
            type: Sequelize.INTEGER,
            notEmpty: true,
        },

        groupTypeName: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
 
    },
    {
        // Really useful https://lorenstewart.me/2016/10/03/sequelize-crud-101/
        // also https://dzone.com/articles/sequelize-javascript-orm
        classMethods:{
            associate:function(models){
                timeType.belongsTo(models.user, { foreignKey: 'id'});
                timeType.hasMany(models.timeType, { foreignKey: 'timeTypeID'} );
            }
        }
    }
    
    
    );
 
    return timeTypeGroup;
 
}