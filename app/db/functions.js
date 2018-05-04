var models = require('../models');
var exports = module.exports = {}

/* -------------- Similar Fucntions -------------- */

//GET Objects of a particular model
exports.getObjects = function (Model) {
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

//GET Object of a particular model with its id
exports.getObjectById = function (Model, id) {
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

//DELETE Object of a particular model with its id
exports.deleteObjectById = function (Model, delete_id) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync().then(() => {
            Model.destroy({
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
        }).catch(()=> {
            reject(false);
        })
    });
}