module.exports = function(sequelize, Sequelize) {
    var CompetitionType = sequelize.define('competition_type', {
        final: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
    
    return CompetitionType;
}