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

exports.getAthleteById = function(id){
    return getObjectById(models.athlete, id);
};
/*
exports.getAthleteOptions = function(){
    var genders = getObjects(models.gender_type);
    var cities = getObjects(models.city);
    return Promise.all([genders, city]);
};*/

exports.addAthlete = function (params, user_id) {
    return new Promise ((resolve, reject) => {
        models.organization.findOne({
            where: {
                user_id: user_id
            }
        }).then(org => {
            models.athlete.create({
                last_name: params[0],
                first_name: params[1],
                middle_name: params[2],
                birthday: params[3],
                gender_type_id: params[4],
                coach: params[5],
                city_id: params[6],
                number: params[7],
                organization_id: org.id,
                user_id: user_id
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
    })
};

exports.addCompetition = function (params) {
    return new Promise ((resolve, reject) => {
        console.log('\n-------------------------------------');
        console.log(params);
        console.log('\n-------------------------------------');
        models.competition.create({
            name: params[0], 
            competition_date_start: params[1],
            place: params[2],
            main_referee: params[3],
            main_secretary: params[4]
        })
        .then(competition => {
            console.log('\nHERE');
            console.log(competition);
            console.log('\n-------------------------------------');
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

exports.changeCompetition = function (params, change_id) {
    return new Promise ((resolve, reject) => {
        models.competition.update({
                name: params[0], 
                competition_date_start: params[1],
                place: params[2],
                main_referee: params[3],
                main_secretary: params[4]
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

exports.getAgentAthletes = function(user_id){
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.athlete.findAll({
                where: { user_id: user_id },
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
        })
        .catch(()=> {
            reject([]);
        })
    });
};

exports.deleteAthlete = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        console.log('---------------------')
        getObjectById(models.athlete, delete_id).then(athlete => {
            if(athlete.user_id == user_id) {
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
        })
        .catch(()=> {
            reject(false);
        })
    });
}

exports.changeAthlete = function (params, change_id, user_id) {
    return new Promise ((resolve, reject) => {
        getObjectById(models.athlete, change_id).then(athlete => {
            if(athlete.user_id == user_id) {
                models.athlete.update({
                        last_name: params[0],
                        first_name: params[1],
                        middle_name: params[2],
                        birthday: params[3],
                        gender_type_id: params[4],
                        coach: params[5],
                        city_id: params[6],
                        number: params[7]
                    }, {
                        where: {
                            id: change_id
                        }
                })
                .then(() => models.athlete.findById(change_id))
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
        })
        .catch(()=> {
            reject({});
        });
    });
};

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


