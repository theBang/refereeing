module.exports = function(sequelize, Sequelize) {
    var GenderType = sequelize.define('gender_type', {
        gender_type: { type: Sequelize.STRING, allowNull: false, unique: true }
    });

    return GenderType;
}