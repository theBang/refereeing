var models = require('../models');
var functions = require('./functions');
var competitionTypeDb = require('./competitionTypeDb');

/* -------------- Athlete Card -------------- */

//GET Athlete Cards that belongs to a particular agent
exports.getAgentAthleteCards = function(user_id){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: { user_id: user_id }
            }).then(organization => {
                models.athlete_card.findAll({
                    include: [
                        { model: models.athlete, where: { organization_id: organization.id } },
                        { model: models.competition_type, include: [{ model: models.competition }, { model: models.athletics_type }] },
                        { model: models.rank }
                    ]
                }).then(objects => {
                    if (objects) {
                        resolve(objects);
                    }
                    reject([]);
                }).catch(()=> {
                    reject([]);
                });
            }).catch(()=> {
                reject([]);
            });
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
                    { model: models.competition_type, 
                        include: [
                            { model: models.athletics_type },
                            { model: models.gender_type },
                            { model: models.competition }
                        ] 
                    },
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
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: {
                    user_id: user_id
                }
            }).then(organization => {
                functions.getObjectById(models.athlete, params[1]).then(athlete => {
                    competitionTypeDb.getCompetitionTypeById(params[2]).then(competitionType => {
                        if(athlete.organization_id == organization.id && athlete.gender_type_id == competitionType.gender_type_id) {
                            models.athlete_card.create({
                                athlete_id: params[1],
                                competition_type_id: params[2],
                                current_result: params[3],
                                rank_id: params[4]
                            })
                            .then(athleteCard => {
                                if (athleteCard) {
                                    resolve(athleteCard);
                                }
                                reject({});
                            }).catch(()=> {
                                reject({});
                            });
                        } else {
                            reject({});
                        }
                    }).catch(()=> {
                        reject({});
                    });
                }).catch(()=> {
                    reject({});
                });
            }).catch(()=> {
                reject({});
            });
        }).catch(()=> {
            reject([]);
        })
    })
};

//CHANGE Athlete Card of a particular agent
exports.changeAgentAthleteCard = function (params, change_id, user_id) {
    
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: {
                    user_id: user_id
                }
            }).then(organization => {
                functions.getObjectById(models.athlete, params[1]).then(athlete => {
                    competitionTypeDb.getCompetitionTypeById(params[2]).then(competitionType => {
                        if(athlete.organization_id == organization.id && athlete.gender_type_id == competitionType.gender_type_id) {
                            models.athlete_card.findOne({
                                where: { id: change_id },
                                include: [
                                    { model: models.athlete, where: { organization_id: organization.id }},
                                ]
                            }).then(athleteCard => {
                                if (athleteCard) {
                                    models.athlete_card.update({
                                        athlete_id: params[1],
                                        competition_type_id: params[2],
                                        current_result: params[3],
                                        rank_id: params[4]
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
                        } else {
                            reject({});
                        }
                    }).catch(()=> {
                        reject({});
                    });
                }).catch(()=> {
                    reject({});
                });
            }).catch(()=> {
                reject({});
            });
        }).catch(()=> {
            reject([]);
        })
    })
};

//DELETE Athlete Card of a particular agent
exports.deleteAgentAthleteCard = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.organization.findOne({
            where: { user_id: user_id }
        }).then(organization => {
            models.athlete_card.findOne({
                where: { id: delete_id },
                include: [
                    { model: models.athlete, where: { organization_id: organization.id }}
                ]
            }).then(athleteCard => {
                if (athleteCard) {
                    models.athlete_card.destroy({
                        where: {
                            id: delete_id
                        }
                    }).then(object => {
                        if (object) {
                            resolve(true);
                        }
                        reject(false);
                    }).catch(()=> {
                        reject(false);
                    });
                } else {
                    reject(false);
                }
            }).catch(()=> {
                reject(false);
            })
        }).catch(()=> {
            reject(false);
        })
    });
}

//GET Competition Types which fit for Competition and Athlete
exports.getCardAthletics = function (competition_id, athlete_id) {
    return new Promise ((resolve, reject) => {
        models.athlete.findOne({
            where: { id: athlete_id }
        }).then(athlete => {
            models.competition_type.findAll({
                where: { competition_id: competition_id, gender_type_id: athlete.gender_type_id },
                include: [{ model: models.athletics_type }]
            }).then(competitionTypes => {
                console.log(competitionTypes);
                if (competitionTypes) {
                    resolve(competitionTypes);
                } else {
                    reject([]);
                }
            }).catch(()=> {
                reject([]);
            });
        }).catch(()=> {
            reject([]);
        })
    });
}