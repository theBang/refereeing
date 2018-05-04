var models = require('../models');
var functions = require('./functions');

var exports = module.exports = {}

exports.getOrg = function(){
    return functions.getObjects(models.organization);
};

exports.getUsers = function(){
    return functions.getObjects(models.user);
};

exports.getGenders = function(){
    return functions.getObjects(models.gender_type);
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