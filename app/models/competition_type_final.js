module.exports = function(sequelize, Sequelize) {
    var CompetitionTypeFinal = sequelize.define('competition_type_final', {
        status: { type: Sequelize.ENUM('Не начат', 'Жеребьевка', 'Идёт', 'Завершён'), defaultValue: 'Не начат' },
        result_type: { type: Sequelize.ENUM('Время', 'См') }
    });

    return CompetitionTypeFinal;
}