var models = require('../models');
var functions = require('./functions');

/* -------------- Competition -------------- */

// GET Competition Types
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

// Add Competition Type
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

// CHANGE Competition Type
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

// DELETE Competition Type
exports.deleteCompetitionType = function (delete_id) {
    return functions.deleteObjectById(models.competition_type, delete_id);
}