module.exports = (sequelize, DataTypes) => {
   
    const Strategic_Objective = sequelize.define("Strategic_Objective", {
     
        strategic_obj: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        strategic_direction : {
            type: DataTypes.STRING,
            allowNull: true
        },
        major_activities : {
            type: DataTypes.STRING,
            allowNull: true
        },
        detailed_activity: {
            type: DataTypes.TEXT('medium'),
            allowNull: true
        },
        detailed_activity_wight: {
            type: DataTypes.STRING,
            allowNull: true
        },
        performance: {
            type: DataTypes.STRING,
            allowNull: true
        },
        responsible_directorate: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Strategic_Objective;
}