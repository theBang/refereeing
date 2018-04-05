module.exports = function(sequelize, Sequelize) {
    var Gender = sequelize.define('gender', {
        gender: { type: Sequelize.STRING, allowNull: false, unique: true }
    });
 
    return Gender;
}