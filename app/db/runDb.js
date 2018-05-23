var models = require('../models');
var functions = require('./functions');

/* -------------- Run -------------- */

// GET Init Results
exports.getInitResults = function(){
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

exports.getCompetitionTypesResults = function (competition_type_id) {
  return new Promise((resolve, reject) => {
      models.run_result.findAll({
          include: [
              { model: models.run, where: { competition_type_id: competition_type_id }},
              { model: models.athlete_card, include: [{ model: models.athlete }]}
          ]
      }).then(runResults => {
          console.log('------------------');
          console.log(runResults);
          if (runResults) {
              resolve(runResults);
          }
          reject([]);
      }).catch(()=> {
          reject([]);
      });
  });
};

exports.changeOnlyResult = function (id, result) {
    return new Promise((resolve, reject) => {
        models.run_result.update({
            result: result
        }, {
            where: {
                id: id
            }
        }).then(() => models.run_result.findById(id)).then(runResult => {
            if (runResult) {
                resolve(runResult.result);
            }
            reject('');
        }).catch(()=> {
            reject('');
        });
    });
};

