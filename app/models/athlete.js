module.exports = function(sequelize, Sequelize) {
    var Athlete = sequelize.define('athlete', {
        first_name: { type: Sequelize.STRING, allowNull: false },
        middle_name: { type: Sequelize.STRING, allowNull: false },
        last_name: { type: Sequelize.STRING, allowNull: false },
        birthday: { type: Sequelize.STRING, allowNull: false},
        coach: { type: Sequelize.STRING, allowNull: false }
    });

    return Athlete;
}