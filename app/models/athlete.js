module.exports = function(sequelize, Sequelize, GenderType, Organization, City, User) {
    var Athlete = sequelize.define('athlete', {
        number: { type: Sequelize.INTEGER, allowNull: false, unique: true },
        first_name: { type: Sequelize.STRING, allowNull: false },
        middle_name: { type: Sequelize.STRING, allowNull: false },
        last_name: { type: Sequelize.STRING, allowNull: false },
        birthday: { type: Sequelize.STRING, allowNull: false},
        coach: { type: Sequelize.STRING, allowNull: false }
    });

    Athlete.belongsTo(GenderType, {foreignKey: 'gender_type_id'});
    Athlete.belongsTo(Organization, {foreignKey: 'organization_id'});
    Athlete.belongsTo(City, {foreignKey: 'city_id'});
    Athlete.belongsTo(User, {foreignKey: 'user_id'});

    return Athlete;
}