var models = require('../models');

var exports = module.exports = {}

exports.getOrg = function(){
    return getObjects(models.organization);
};

exports.getUsers = function(){
    return getObjects(models.user);
};

exports.getGenders = function(){
    return getObjects(models.gender_type);
};

exports.getCities = function(){
    return getObjects(models.city);
};

exports.getCompetitions = function(){
    return getObjects(models.competition);
};

exports.getAthleticsTypes = function(){
    return getObjects(models.athletics_type);
};

exports.getRank = function(){
    return getObjects(models.rank);
};

exports.getAppearence = function(){
    return getObjects(models.appearence);
};

exports.getGenderById = function(id){
    return getObjectById(models.gender_type, id);
};

exports.getCityById = function(id){
    return getObjectById(models.city, id);
};

exports.getOrgById = function(id){
    return getObjectById(models.organization, id);
};

exports.getCompetitionById = function(id){
    return getObjectById(models.competition, id);
};

exports.getAthleticsTypeById = function(id){
    return getObjectById(models.athletics_type, id);
};

exports.getRankById = function(id){
    return getObjectById(models.rank, id);
};

exports.getAppearenceById = function(id){
    return getObjectById(models.appearence, id);
};

/*
exports.getAthleteOptions = function(){
    var genders = getObjects(models.gender_type);
    var cities = getObjects(models.city);
    return Promise.all([genders, city]);
};*/

/* -------------- Athlete -------------- */

// GET all Athletes
exports.getAthletes = function(){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.athlete.findAll({
                include: [
                    { model: models.gender_type },
                    { model: models.city },
                    { model: models.organization }
                ]
            }).then(objects => {
                if (objects) {
                    resolve(objects);
                }
                reject([]);
            })
        })
        .catch(()=> {
            reject([]);
        })
    });
};

// GET Athletes of a particular organization aka user-agent
exports.getAgentAthletes = function(user_id){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: { user_id: user_id }
            }).then(organization => {
                models.athlete.findAll({
                    where: { organization_id: organization.id },
                    include: [
                        { model: models.gender_type },
                        { model: models.city }
                    ]
                }).then(objects => {
                    if (objects) {
                        resolve(objects);
                    }
                    reject([]);
                })
            }).catch(()=> {
                reject([]);
            });
        }).catch(()=> {
            reject([]);
        })
    });
};

// DELETE Athlete
exports.deleteAthlete = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: { user_id: user_id }
            }).then(organization => {
                getObjectById(models.athlete, delete_id).then(athlete => {
                    if(athlete.organization_id == organization.id) {
                        models.athlete.destroy({
                            where: {
                                id: delete_id
                            }
                        })
                        .then(athlete => {
                            if (athlete) {
                                resolve(true);
                            }
                            reject(false);
                        })
                        .catch(()=> {
                            reject(false);
                        });
                    } else {
                        reject(false);
                    }
                }).catch(()=> {
                    reject(false);
                });
            }).catch(()=> {
                reject(false);
            });
        }).catch(()=> {
            reject(false);
        })
    });
}

// ADD Athlete
exports.addAthlete = function (params, user_id) {
    return new Promise ((resolve, reject) => {
        models.organization.findOne({
            where: {
                user_id: user_id
            }
        }).then(organization => {
            console.log(params);
            models.athlete.create({
                last_name: params[0],
                first_name: params[1],
                middle_name: params[2],
                birthday: params[3],
                gender_type_id: params[4],
                coach: params[5],
                city_id: params[6],
                organization_id: organization.id
            })
            .then(athlete => {
                if (athlete) {
                    resolve(athlete);
                }
                reject([]);
            })
            .catch(()=> {
                reject([]);
            });
        }).catch(()=> {
            reject([]);
        });
    });
};

// CHANGE Athlete
exports.changeAthlete = function (params, change_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.organization.findOne({
            where: {
                user_id: user_id
            }
        }).then(organization => {
            getObjectById(models.athlete, change_id).then(athlete => {
                if(athlete.organization_id == organization.id) {
                    models.athlete.update({
                            last_name: params[0],
                            first_name: params[1],
                            middle_name: params[2],
                            birthday: params[3],
                            gender_type_id: params[4],
                            coach: params[5],
                            city_id: params[6]
                        }, {
                            where: {
                                id: change_id
                            }
                    }).then(() => models.athlete.findById(change_id)).then(athlete => {
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
        }).catch(()=> {
            reject({});
        });
    });
};

// Find user by ID
exports.getAthleteById = function(id){
    return getObjectById(models.athlete, id);
};

/* -------------- Competition -------------- */

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
    return new Promise ((resolve, reject) => {
        models.competition.destroy({
            where: {
                id: delete_id
            }
        })
        .then(competition => {
            if (competition) {
                resolve(true);
            }
            reject(false);
        })
        .catch(()=> {
            reject(false);
        });
    });
}



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

exports.getCompetitionTypes = function(){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.competition_type.findAll({
                include: [
                    { model: models.competition },
                    { model: models.athletics_type },
                    { model: models.gender_type }
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

exports.addCompetitionType = function (params) {
    return new Promise ((resolve, reject) => {
        console.log(params);
        models.competition_type.create({
            competition_id: params[0],
            athletics_type_id: params[1],
            gender_type_id: params[2],
            qualification: params[3]
        })
        .then(competitionType => {
            if (competitionType) {
                resolve(competitionType);
            }
            reject([]);
        })
        .catch(()=> {
            reject([]);
        });
    })
};

exports.changeCompetitionType = function (params, change_id) {
    return new Promise ((resolve, reject) => {
        console.log(params);
        models.competition_type.update({
            competition_id: params[0],
            athletics_type_id: params[1],
            gender_type_id: params[2],
            qualification: params[3]
        }, {
            where: {
                id: change_id
            }
        })
        .then(() => models.competition_type.findById(change_id))
        .then(competitionType => {
            if (competitionType) {
                resolve(competitionType);
            }
            reject({});
        })
        .catch(()=> {
            reject({});
        });
    });
};

exports.deleteCompetitionType = function (delete_id) {
    return new Promise ((resolve, reject) => {
        models.competition_type.destroy({
            where: {
                id: delete_id
            }
        })
        .then(competitionType => {
            if (competitionType) {
                resolve(true);
            }
            reject(false);
        })
        .catch(()=> {
            reject(false);
        });
    });
}

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

exports.deleteAgentAthleteCard = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.athlete_card.findOne({
            where: { id: delete_id },
            include: [
                { model: models.athlete, where: { user_id: user_id }},
            ]
        }).then(athleteCard => {
            if (athleteCard) {
                models.athlete_card.destroy({
                    where: {
                        id: delete_id
                    }
                }).then(athleteCard => {
                    if (athleteCard) {
                        resolve(true);
                    }
                    reject(false);
                }).catch(() => {
                    reject(false);
                });
            } else {
                reject(false);
            }
        })
        .catch(()=> {
            reject(false);
        })
    });
}

function getObjects (Model) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync()
            .then(() => {
                Model.findAll().then(objects => {
                    if (objects) {
                        resolve(objects);
                    }
                    reject([]);
                })
            })
            .catch(()=> {
                reject([]);
            })
    });
}

function getObjectById (Model, id) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync()
            .then(() => {
                Model.findById(id).then(objects => {
                    if (objects) {
                        resolve(objects);
                    }
                    reject([]);
                })
            })
            .catch(()=> {
                reject([]);
            })
    });
}


