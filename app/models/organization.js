module.exports = function(sequelize, Sequelize) {
    var Organization = sequelize.define('organization', {
        name: { type: Sequelize.STRING, allowNull: false },
        team_fight: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
 
    return Organization;
}