module.exports = function(sequelize, Sequelize) {
    var timeType = sequelize.define('timeType', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        // groupTypeId added at runtime by sequelize

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
    
    );
 
    sequelize.models.timeType.hasMany(
        sequelize.models.slots, { 
            foreignKey: {id: 'timeTypeId', allowNull: false },
            onDelete: 'CASCADE'
    }); 

        
    return timeType;
 
}