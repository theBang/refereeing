module.exports = function(sequelize, Sequelize) {
    var AthleticsType = sequelize.define('athletics_type', {
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        place: { type: Sequelize.STRING },
        tech_type: { type: Sequelize.STRING}
    });

    return AthleticsType;
}