module.exports = function(sequelize, Sequelize) {
    var Record = sequelize.define('record', {
        world_record_male: { type: Sequelize.STRING},
        europe_record_male: { type: Sequelize.STRING},
        russia_record_male: { type: Sequelize.STRING},
        world_record_female: { type: Sequelize.STRING},
        europe_record_female: { type: Sequelize.STRING},
        russia_record_female: { type: Sequelize.STRING},
    });
 
    return Record;
}