var models = require('../models');
var functions = require('./functions');

var exports = module.exports = {}

/* -------------- Organizations -------------- */

// GET Organizations
exports.getOrg = function(){
    return functions.getObjects(models.organization);
};

// ADD Organization
exports.addOrganization = function (params) {
    models.organization.create({
        name: params[1],
        team_fight: params[2],
        user_id: params[3]
    }).then(organization => {
        if (organization) {
            resolve(organization);
        }
        reject({});
    })
    .catch(()=> {
        reject({});
    });
};

// CHANGE Organization
exports.changeOrganization = function (params, change_id) {
    return new Promise ((resolve, reject) => {
        models.organization.update({
            name: params[1],
            team_fight: params[2],
            user_id: params[3]
        }, {
            where: {
                id: change_id
            }
        }).then(() => models.organization.findById(change_id)).then(organization => {
            if (organization) {
                resolve(organization);
            }
            reject({});
        })
        .catch(()=> {
            reject({});
        });
    });
};

// DELETE Organization
exports.deleteCompetition = function (delete_id) {
    return functions.deleteObjectById(models.organization, delete_id);
};


/* -------------- Users -------------- */

exports.getUsers = function(){
    return functions.getObjects(models.user);
};

/* -------------- Genders -------------- */

exports.getGenders = function(){
    return functions.getObjects(models.gender);
};

exports.addGender = function(params) {
    models.gender.create({
        gender: params[1]
    }).then(gender => {
        console.log('++++++++++++++++++++++++++++++');
        console.log(gender);
        if (gender) {
            resolve(gender);
        }
        reject({});
    }).catch(()=> {
        reject({});
    });
};

exports.getCities = function(){
    return functions.getObjects(models.city);
};

exports.getAthleticsTypes = function(){
    return functions.getObjects(models.athletics_type);
};

exports.getRank = function(){
    return functions.getObjects(models.rank);
};

exports.getAppearence = function(){
    return functions.getObjects(models.appearence);
};

exports.getGenderById = function(id){
    return functions.getObjectById(models.gender_type, id);
};

exports.getCityById = function(id){
    return functions.getObjectById(models.city, id);
};

exports.getOrgById = function(id){
    return functions.getObjectById(models.organization, id);
};

exports.getAthleticsTypeById = function(id){
    return functions.getObjectById(models.athletics_type, id);
};

exports.getRankById = function(id){
    return functions.getObjectById(models.rank, id);
};

exports.getAppearenceById = function(id){
    return functions.getObjectById(models.appearence, id);
};