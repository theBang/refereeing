module.exports = function(sequelize, Sequelize, User) {
    var Organization = sequelize.define('organization', {
        name: { type: Sequelize.STRING, allowNull: false },
        team_fight: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
    
    Organization.belongsTo(User, {foreignKey: 'user_id'});
 
    return Organization;
}