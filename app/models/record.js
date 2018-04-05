module.exports = function(sequelize, Sequelize) {
    var Record = sequelize.define('record', {
        world_record_male: { type: Sequelize.DATE, allowNull: false},
        europe_record_male: { type: Sequelize.DATE, allowNull: false},
        russia_record_male: { type: Sequelize.DATE, allowNull: false},
        world_record_female: { type: Sequelize.DATE, allowNull: false},
        europe_record_female: { type: Sequelize.DATE, allowNull: false},
        russia_record_female: { type: Sequelize.DATE, allowNull: false},
    });
 
    return Record;
}