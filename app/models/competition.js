module.exports = function(sequelize, Sequelize) {
 
    var Сompetition = sequelize.define('competition', {
        name: { type: Sequelize.STRING, allowNull: false},
        is_summer: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
        main_referee: { type: Sequelize.STRING, allowNull: false},
        referee_category: { type: Sequelize.STRING(2), allowNull: false},
        main_secretary: { type: Sequelize.STRING, allowNull: false},
        secretary_category: { type: Sequelize.STRING(2), allowNull: false},
        competition_date_start: { type: Sequelize.DATEONLY, allowNull: false},
        competition_date_end: { type: Sequelize.DATEONLY, allowNull: false},
        place: { type: Sequelize.STRING, allowNull: false},
    });
 
    return Сompetition;
 
}