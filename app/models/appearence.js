module.exports = function(sequelize, Sequelize) {
    var Appearence = sequelize.define('appearence', {
        name: { type: Sequelize.STRING, allowNull: false, unique: true},
    });
    
    return Appearence;
}