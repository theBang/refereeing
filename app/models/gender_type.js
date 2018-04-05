module.exports = function(sequelize, Sequelize, Gender) {
    var GenderType = sequelize.define('gender_type', {
        gender_type: { type: Sequelize.STRING, allowNull: false, unique: true }
    });

    GenderType.belongsTo(Gender, {foreignKey: 'gender_id'});

    return GenderType;
}