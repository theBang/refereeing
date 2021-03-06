var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }

    var tableHead = ['Соревнование', 'Вид', 'Пол', 'Действие'];

    if(judge) {
        db.getCompetitionTypes().then(competitionTypes => {
            var outCompetitionTypes = [];
            competitionTypes.forEach(competitionType => {
                outCompetitionTypes.push({
                    id: competitionType.id,
                    competition: competitionType.competition.name,
                    athletics: competitionType.athletics_type.name,
                    gender: competitionType.gender_type.gender_type
                });
            });
            
            res.render('competition_type.hbs', {
                title: 'Виды на соревнованиях',
                tableHead: tableHead,
                competitionTypes: outCompetitionTypes,
                username: user.email,
                admin: admin,
                judge: judge,
                agent: agent
            });
        
        })
        .catch (() => {
            res.sendStatus(500);
        });
    } 
}

exports.getOptions = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (judge) {
        db.getCompetitions().then(competitions => {
            db.getGenders().then(genders => {
                db.getAthleticsTypes().then(athletics => {
                    var data = {};
                    data.competitions = competitions;
                    data.genders = genders;
                    data.athletics = athletics;
                    res.status(200);
                    res.setHeader("Content-Type", "application/json");
                    res.send(JSON.stringify(data));
                }).catch(() => {
                    res.sendStatus(500)
                });
            }).catch(() => {
                res.sendStatus(500)
            });
        }).catch(() => {
            res.sendStatus(500)
        });
    }
}

exports.add = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (judge) 
        returnCompetitionType(db.addCompetitionType(req.body.object), res); 
}

exports.change = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (judge) 
        returnCompetitionType(db.changeCompetitionType(req.body.object, req.body.id), res); 
}

exports.delete = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (judge) {
        db.deleteCompetitionType(req.body.id, user.id)
            .then(deleted => {
                if (deleted) {
                    res.status(200);
                    res.setHeader("Content-Type", "application/json");
                    res.send(JSON.stringify({ id: req.body.id }));
                } else {
                    res.sendStatus(500);
                }
            })
            .catch (() => {
                res.sendStatus(500);
            });    
    }
}

function returnCompetitionType(competitionTypePromise, res) {
    competitionTypePromise.then(competitionType => {
        db.getCompetitionById(competitionType.competition_id).then(competition => {
            db.getAthleticsTypeById(competitionType.athletics_type_id).then(athletic => {
                db.getGenderById(competitionType.gender_type_id).then(gender => {
                    if (competitionType) {
                        var data = {
                            id: competitionType.id,
                            row: [
                                competition.name,
                                athletic.name,
                                gender.gender_type
                            ]
                        };
                        res.status(200);
                        res.setHeader("Content-Type", "application/json");
                        res.send(JSON.stringify(data));
                    } else {
                        res.sendStatus(500);
                    }
                }).catch(() => {
                    res.sendStatus(500)
                });
            }).catch(() => {
                res.sendStatus(500)
            });
        }).catch(() => {
            res.sendStatus(500)
        });
    }).catch(() => {
        res.sendStatus(500)
    });
}