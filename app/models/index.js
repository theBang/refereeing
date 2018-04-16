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

//Athlete
db.gender = require('./gender')(sequelize, Sequelize);
db.gender_type = require('./gender_type')(sequelize, Sequelize, db.gender);
db.rank = require('./rank')(sequelize, Sequelize);
db.organization = require('./organization')(sequelize, Sequelize, db.user);
db.city = require('./city')(sequelize, Sequelize);
db.athlete = require('./athlete')(sequelize, Sequelize, db.gender_type, db.organization, db.city, db.user);

//AthleteCard
db.record = require('./record')(sequelize, Sequelize);
db.athletics_type = require('./athletics_type')(sequelize, Sequelize, db.record);
db.competition = require('./competition')(sequelize, Sequelize);
db.appearence = require('./appearence')(sequelize, Sequelize);
db.athlete_card = require('./athlete_card')(sequelize, Sequelize, db.athletics_type, db.rank, db.competition, db.appearence);
db.athlete.hasMany(db.athlete_card, { onDelete: 'cascade' });
db.athlete_card.belongsTo(db.athlete, { foreignKey: 'athlete_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;