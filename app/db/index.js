var exports = module.exports = {}

/* -------------- Athlete -------------- */

var athleteDb = require('./athleteDb');

exports.getAthletes = athleteDb.getAthletes;
exports.getAgentAthletes = athleteDb.getAgentAthletes;
exports.getAthleteById = athleteDb.getAthleteById;
exports.addAthlete = athleteDb.addAthlete;
exports.changeAthlete = athleteDb.changeAthlete;
exports.deleteAthlete = athleteDb.deleteAthlete;

/* -------------- Competition -------------- */

var competitionDb = require('./competitionDb');

exports.getCompetitions = competitionDb.getCompetitions;
exports.getCompetitionById = competitionDb.getCompetitionById;
exports.addCompetition = competitionDb.addCompetition;
exports.changeCompetition = competitionDb.changeCompetition;
exports.deleteCompetition = competitionDb.deleteCompetition;
exports.getCompetitionAthletics = competitionDb.getCompetitionAthletics;
exports.startCompetition = competitionDb.startCompetition;

/* -------------- Competition Types -------------- */

var competitionTypeDb = require('./competitionTypeDb');

exports.getCompetitionTypes = competitionTypeDb.getCompetitionTypes;
exports.getCompetitionTypeById = competitionTypeDb.getCompetitionTypeById;
exports.addCompetitionType = competitionTypeDb.addCompetitionType;
exports.changeCompetitionType = competitionTypeDb.changeCompetitionType;
exports.deleteCompetitionType = competitionTypeDb.deleteCompetitionType;
exports.getCompetitionTypeByCompetition = competitionTypeDb.getCompetitionTypeByCompetition;
exports.getCompetitionTypeAthleticsGender = competitionTypeDb.getCompetitionTypeAthleticsGender;

/* -------------- Athlete Card -------------- */

var athleteCardDb = require('./athleteCardDb');

exports.getAgentAthleteCards = athleteCardDb.getAgentAthleteCards;
exports.getAthleteCards = athleteCardDb.getAthleteCards;
exports.addAgentAthleteCard = athleteCardDb.addAgentAthleteCard;
exports.changeAgentAthleteCard = athleteCardDb.changeAgentAthleteCard;
exports.deleteAgentAthleteCard = athleteCardDb.deleteAgentAthleteCard;
exports.getCardAthletics = athleteCardDb.getCardAthletics;

/* -------------- Run -------------- */

var runDb = require('./runDb');

exports.getCompetitionTypesResults = runDb.getCompetitionTypesResults;
exports.changeOnlyResult = runDb.changeOnlyResult;

/* -------------- Other Models -------------- */

var otherDb = require('./otherDb');

exports.getUsers = otherDb.getUsers;

exports.getOrg = otherDb.getOrg;
exports.addOrganization = otherDb.addOrganization;
exports.changeOrganization = otherDb.changeOrganization;
exports.deleteCompetition = otherDb.deleteCompetition;
exports.getOrgById = otherDb.getOrgById;

/* -------------- Genders -------------- */

exports.getGenders = otherDb.getGenders;
exports.getAdminGenders = otherDb.getAdminGenders;
exports.getGenderById = otherDb.getGenderById;
exports.addGender = otherDb.addGender;
exports.changeGender = otherDb.changeGender;
exports.deleteGender = otherDb.deleteGender;

exports.getCities = otherDb.getCities;
exports.getCityById = otherDb.getCityById;

exports.getAthleticsTypes = otherDb.getAthleticsTypes;
exports.getAthleticsTypeById = otherDb.getAthleticsTypeById;

exports.getRank = otherDb.getRank;
exports.getRankById = otherDb.getRankById;

exports.getAppearence = otherDb.getAppearence;
exports.getAppearenceById = otherDb.getAppearenceById;

