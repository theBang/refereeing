module.exports = function(sequelize, Sequelize, Record) {
    var AthleticsType = sequelize.define('athletics_type', {
        name: { type: Sequelize.STRING, allowNull: false },
        place: { type: Sequelize.STRING, allowNull: false },
        tech_type: { type: Sequelize.STRING, allowNull: false }
    });

    AthleticsType.belongsTo(Record, {foreignKey: 'record_id'});

    return AthleticsType;
}