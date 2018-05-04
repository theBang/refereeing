var models = require('../models');
var functions = require('./functions');

/* -------------- Athlete Card -------------- */

//GET Athlete Cards that belongs to a particular agent
exports.getAgentAthleteCards = function(user_id){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.athlete_card.findAll({
                include: [
                    { model: models.athlete, where: { user_id: user_id }},
                    { model: models.competition },
                    { model: models.athletics_type },
                    { model: models.rank },
                    { model: models.appearence }
                ]
            }).then(objects => {
                if (objects) {
                    resolve(objects);
                }
                reject([]);
            })
        }).catch(()=> {
            reject([]);
        })
    });
};

//GET All Athlete Cards
exports.getAthleteCards = function(){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.athlete_card.findAll({
                include: [
                    { model: models.athlete},
                    { model: models.competition },
                    { model: models.athletics_type },
                    { model: models.rank },
                    { model: models.appearence }
                ]
            }).then(objects => {
                if (objects) {
                    resolve(objects);
                }
                reject([]);
            })
        }).catch(()=> {
            reject([]);
        })
    });
};

//ADD Athlete Card to a particular agent
exports.addAgentAthleteCard = function (params, user_id) {
    return new Promise ((resolve, reject) => {
        models.athlete_card.create({
            competition_id: params[0],
            athlete_id: params[1],
            athletics_type_id: params[2],
            current_result: params[3],
            rank_id: params[4],
            appearence_id: params[5]
        })
        .then(athleteCard => {
            if (athleteCard) {
                resolve(athleteCard);
            }
            reject([]);
        })
        .catch(()=> {
            reject([]);
        });
    })
};

//CHANGE Athlete Card of a particular agent
exports.changeAgentAthleteCard = function (params, change_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.athlete_card.findOne({
            where: { id: change_id },
            include: [
                { model: models.athlete, where: { user_id: user_id }},
            ]
        }).then(athleteCard => {
            if (athleteCard) {
                models.athlete_card.update({
                    competition_id: params[0],
                    athlete_id: params[1],
                    athletics_type_id: params[2],
                    current_result: params[3],
                    rank_id: params[4],
                    appearence_id: params[5]
                }, {
                    where: {
                        id: change_id
                    }
                })
                .then(() => models.athlete_card.findById(change_id))
                .then(athlete => {
                    if (athlete) {
                        resolve(athlete);
                    }
                    reject({});
                })
                .catch(()=> {
                    reject({});
                });
            } else {
                reject({});
            }
        }).catch(()=> {
            reject({});
        });
    });
};

//DELETE Athlete Card of a particular agent
exports.deleteAgentAthleteCard = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.athlete_card.findOne({
            where: { id: delete_id },
            include: [
                { model: models.athlete, where: { user_id: user_id }},
            ]
        }).then(athleteCard => {
            if (athleteCard) {
                return functions.deleteObjectById(models.athlete_card, delete_id);
            } else {
                reject(false);
            }
        })
        .catch(()=> {
            reject(false);
        })
    });
}