var models = require('../models');
var functions = require('./functions');

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

// Find Athlete by ID
exports.getAthleteById = function(id){
    return functions.getObjectById(models.athlete, id);
};

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
                reject({});
            })
            .catch(()=> {
                reject({});
            });
        }).catch(()=> {
            reject({});
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
            functions.getObjectById(models.athlete, change_id).then(athlete => {
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

// DELETE Athlete
exports.deleteAthlete = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            models.organization.findOne({
                where: { user_id: user_id }
            }).then(organization => {
                functions.getObjectById(models.athlete, delete_id).then(athlete => {
                    if(athlete.organization_id == organization.id) {
                        return functions.deleteObjectById(models.athlete, delete_id);
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
};