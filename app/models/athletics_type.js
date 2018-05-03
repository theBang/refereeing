module.exports = function(sequelize, Sequelize) {
    var AthleticsType = sequelize.define('athletics_type', {
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        result_type: { type: Sequelize.ENUM('Время', 'Расстояние') },
        place: { type: Sequelize.STRING },
        tech_type: { type: Sequelize.STRING}
    });

    return AthleticsType;
}