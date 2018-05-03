module.exports = function(sequelize, Sequelize) {
 
    var Сompetition = sequelize.define('competition', {
        name: { type: Sequelize.STRING},
        is_summer: { type: Sequelize.BOOLEAN, defaultValue: true},
        main_referee: { type: Sequelize.STRING},
        referee_category: { type: Sequelize.STRING(2)},
        main_secretary: { type: Sequelize.STRING},
        secretary_category: { type: Sequelize.STRING(2)},
        competition_date_start: { type: Sequelize.DATEONLY},
        competition_date_end: { type: Sequelize.DATEONLY},
        place: { type: Sequelize.STRING},
        track_count: { type: Sequelize.INTEGER }
    });
 
    return Сompetition;
 
}