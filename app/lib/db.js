var models = require('../models');

var exports = module.exports = {}

exports.getOrg = function(){
    return getObjects(models.organization);
};

exports.getUsers = function(){
    return getObjects(models.user);
};

exports.getCompete = function(){
    return getObjects(models.competition);
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

exports.getGenders = function(){
    return getObjects(models.gender_type);
};

exports.getCities = function(){
    return getObjects(models.city);
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
/*
exports.getAthleteOptions = function(){
    var genders = getObjects(models.gender_type);
    var cities = getObjects(models.city);
    return Promise.all([genders, city]);
};*/

exports.addAthlete = function (params, user_id) {
    return new Promise ((resolve, reject) => {
        models.organization.findAll({
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

exports.deleteAthlete = function (delete_id, user_id) {
    return new Promise ((resolve, reject) => {
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
            }
        })
        .catch(()=> {
            reject({});
        });
    });
};

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


