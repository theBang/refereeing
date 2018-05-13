var models = require('../models');
var functions = require('./functions');

/* -------------- Competition -------------- */

// GET Competitions
exports.getCompetitions = function(){
    return functions.getObjects(models.competition);
};

// GET Competition by ID
exports.getCompetitionById = function(id){
    return functions.getObjectById(models.competition, id);
};

// ADD Competition
exports.addCompetition = function (params) {
    return new Promise ((resolve, reject) => {
        models.competition.create({
            name: params[0], 
            competition_date_start: params[1],
            place: params[2],
            main_referee: params[3],
            main_secretary: params[4],
            track_count: params[5]
        })
        .then(competition => {
            if (competition) {               
                resolve(competition);
            }
            reject({});
        })
        .catch(()=> {
            reject({});
        });
    })
};

// START Competition
exports.startCompetition = function (competition_id) {
    return new Promise ((resolve, reject) => {
        models.sequelize.query('execute toArrangeRuns \''+ competition_id + '\';')
            .spread(function(result) {
                console.log('RESULT', result);
                resolve(true);
            })
            .error(function(err) {
                console.log('ERR', err);
                reject(false);
            });
    })
};

// CHANGE Competition
exports.changeCompetition = function (params, change_id) {
    return new Promise ((resolve, reject) => {
        models.competition.update({
                name: params[0], 
                competition_date_start: params[1],
                place: params[2],
                main_referee: params[3],
                main_secretary: params[4],
                track_count: params[5]
            }, {
                where: {
                    id: change_id
                }
        })
        .then(() => models.competition.findById(change_id))
        .then(competition => {
            if (competition) {
                resolve(competition);
            }
            reject({});
        })
        .catch(()=> {
            reject({});
        });
    });
};

// DELETE Competition
exports.deleteCompetition = function (delete_id) {
    return functions.deleteObjectById(models.competition, delete_id);
};

//GET Competition Types which fit for Competition
exports.getCompetitionAthletics = function (competition_id) {
    return new Promise ((resolve, reject) => {
        models.competition_type.findAll({
            where: { competition_id: competition_id },
            include: [{ model: models.athletics_type }]
        }).then(competitionTypes => {
            if (competitionTypes) {
                resolve(competitionTypes);
            } else {
                reject([]);
            }
        }).catch(()=> {
            reject([]);
        });
    });
}
