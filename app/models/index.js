"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

//User
db.user = require('./user')(sequelize, Sequelize);

// ---------- Athlete --------------
//Gender
db.gender = require('./gender')(sequelize, Sequelize);
db.gender_type = require('./gender_type')(sequelize, Sequelize, db.gender);
db.gender_type.belongsTo(db.gender, {foreignKey: 'gender_id'});

db.rank = require('./rank')(sequelize, Sequelize);

//Organization
db.organization = require('./organization')(sequelize, Sequelize, db.user);  
db.organization.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.organization, { onDelete: 'cascade', foreignKey: 'user_id' });

//Athlete
db.city = require('./city')(sequelize, Sequelize);
db.athlete = require('./athlete')(sequelize, Sequelize);
db.athlete.belongsTo(db.gender_type, {foreignKey: 'gender_type_id'});
db.athlete.belongsTo(db.organization, {foreignKey: 'organization_id'});
db.organization.hasMany(db.athlete, { onDelete: 'cascade', foreignKey: 'organization_id' });
db.athlete.belongsTo(db.city, {foreignKey: 'city_id'});

// ---------- Competition --------------
//Record
db.record = require('./record')(sequelize, Sequelize);
db.athletics_type = require('./athletics_type')(sequelize, Sequelize, db.record);
db.athletics_type.belongsTo(db.record, {foreignKey: 'record_id'});

//Competition
db.competition = require('./competition')(sequelize, Sequelize);

//Competition Type
db.competition_type = require('./competition_type')(sequelize, Sequelize);
db.competition_type.belongsTo(db.competition, { foreignKey: 'competition_id'});
db.competition.hasMany(db.competition_type, { onDelete: 'cascade', foreignKey: 'competition_id' });
db.competition_type.belongsTo(db.athletics_type, {foreignKey: 'athletics_type_id'});
db.competition_type.belongsTo(db.gender_type, {foreignKey: 'gender_type_id'});
sequelize.queryInterface.addConstraint('competition_types', ['competition_id', 'athletics_type_id', 'gender_type_id'], {
    type: 'unique',
    name: 'compete_athletics_gender_unique'
});

// ---------- AthleteCard --------------
db.appearence = require('./appearence')(sequelize, Sequelize);
db.athlete_card = require('./athlete_card')(sequelize, Sequelize);
db.athlete_card.belongsTo(db.competition_type, {foreignKey: 'competition_type_id'});
db.competition_type.hasMany(db.athlete_card, { onDelete: 'cascade', foreignKey: 'competition_type_id' });
db.athlete_card.belongsTo(db.rank, {foreignKey: 'rank_id'});
db.athlete_card.belongsTo(db.appearence, {foreignKey: 'appearence_id'});
db.athlete.hasMany(db.athlete_card, { onDelete: 'cascade', foreignKey: 'athlete_id' });
db.athlete_card.belongsTo(db.athlete, { foreignKey: 'athlete_id' });
/*sequelize.queryInterface.addConstraint('athlete_cards', ['number', 'competition_type_id'], {
    type: 'unique',
    name: 'compete_number_unique'
});*/
sequelize.queryInterface.addConstraint('athlete_cards', ['athlete_id', 'competition_type_id'], {
    type: 'unique',
    name: 'compete_number_unique'
});

// ---------- Results --------------
// ---------- Run --------------
db.run = require('./run')(sequelize, Sequelize);
db.run.belongsTo(db.competition_type, {foreignKey: 'competition_type_id'});

//RunResults
db.run_result = require('./run_result')(sequelize, Sequelize);
db.run_result.belongsTo(db.athlete_card, {foreignKey: 'athlete_card_id'});
db.run_result.belongsTo(db.run, {foreignKey: 'run_id'});

// ---------- Try --------------
db.try = require('./try')(sequelize, Sequelize);
db.try.belongsTo(db.competition_type, {foreignKey: 'competition_type_id'});

//TryResults
db.try_result = require('./try_result')(sequelize, Sequelize);
db.try_result.belongsTo(db.athlete_card, {foreignKey: 'athlete_card_id'});
db.try_result.belongsTo(db.try, {foreignKey: 'try_id'});

// ---------- Final Protocol --------------
db.final_protocol = require('./final_protocol')(sequelize, Sequelize);
db.final_protocol.belongsTo(db.run_result, {foreignKey: 'run_result_id'});

// ---------- Start Protocol --------------
db.start_protocol = require('./start_protocol')(sequelize, Sequelize);

// ---------- News --------------
db.news = require('./news')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
