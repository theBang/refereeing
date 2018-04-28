module.exports = function(sequelize, Sequelize) {
    var AthleteCard = sequelize.define('athlete_card', {
        current_result: { type: Sequelize.STRING},
        number: { type: Sequelize.INTEGER}
    });

    return AthleteCard;
}