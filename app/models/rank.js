module.exports = function(sequelize, Sequelize) {
    var Rank = sequelize.define('rank', {
        name: { type: Sequelize.STRING, allowNull: false, unique: true }
    });
 
    return Rank;
}