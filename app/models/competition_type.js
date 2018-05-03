module.exports = function(sequelize, Sequelize) {
    var CompetitionType = sequelize.define('competition_type', {
        qualification: { type: Sequelize.BOOLEAN },        
        status: { type: Sequelize.ENUM('Не начат', 'Жеребьевка', 'Идёт', 'Завершён'), defaultValue: 'Не начат' }
    });

    return CompetitionType;
}