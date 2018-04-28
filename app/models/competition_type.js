module.exports = function(sequelize, Sequelize) {
    var CompetitionType = sequelize.define('competition_type', {
        tracks_count: { type: Sequelize.INTEGER },
        qualification: { type: Sequelize.BOOLEAN }
    });

    return CompetitionType;
}