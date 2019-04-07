module.exports = function(sequelize, Sequelize) {
    var timeTypeGroup = sequelize.define('timeTypeGroup', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        groupTypeName: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
 
    },

    // userId relation added at runtime by sequelize
    
    );

    sequelize.models.timeTypeGroup.hasMany(
        sequelize.models.timeType, { 
            foreignKey: { id: 'timeTypeId', allowNull: false },
            onDelete: 'CASCADE'
            }); 
 
    return timeTypeGroup;
 
}