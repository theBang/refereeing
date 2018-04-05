module.exports = function(sequelize, Sequelize, Athlete, AthleticsType, Rank, Сompetition, Appearence) {

    var AthleteCard = sequelize.define('athlete_card', {
        current_result: { type: Sequelize.DATE, allowNull: false}
    });

    AthleteCard.belongsTo(Athlete, {foreignKey: 'athlete_id'});
    AthleteCard.belongsTo(AthleticsType, {foreignKey: 'athletics_type_id'});
    AthleteCard.belongsTo(Rank, {foreignKey: 'rank_id'});
    AthleteCard.belongsTo(Сompetition, {foreignKey: 'competition_id'});
    AthleteCard.belongsTo(Appearence, {foreignKey: 'appearence_id'});

    return AthleteCard;
}