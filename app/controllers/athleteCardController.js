var db = require('../lib/db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    console.log('--------------------------------------------------------------------------------------');
    console.log('Get athleteCards');
    var tableHead = ['Соревнование', 'Спортсмен', 'Вид спорта', 'Лучший результат', 'Разряд'];
    
    if (agent) {
        db.getAgentAthleteCards(user.id).then(athleteCards => {
            var outAthleteCards = [];
            athleteCards.forEach(function(athleteCard) {
                outAthleteCards.push({
                    id: athleteCard.id,
                    competition: athleteCard.competition.name,
                    athlete: athleteCard.athlete.last_name + " " + athleteCard.athlete.first_name.charAt(0) + "." + athleteCard.athlete.middle_name.charAt(0) + ".",
                    athletics: athleteCard.athletics_type.name,
                    result: athleteCard.current_result,
                    rank: athleteCard.rank.name
                });
                
            });

            res.render('athlete_card.hbs', {
                title: 'Карточки спортсменов',
                tableHead: tableHead,
                athleteCards: outAthleteCards,
                username: user.email,
                admin: admin,
                judge: judge,
                agent: agent
            });
        })
        .catch (() => {
            res.sendStatus(500);
        });
    } else {
        res.redirect('/');
    }
}

exports.getOptions = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (agent) {
        db.getAgentAthletes(user.id).then(athletes => {
            db.getCompetitions().then(competitions => {
                db.getAthleticsTypes().then(athletics => {
                    db.getRank().then(ranks => {
                        db.getAppearence().then(appearences => {
                            var data = {};
                            data.athletes = athletes;
                            data.competitions = competitions;
                            data.athletics = athletics;
                            data.ranks = ranks;
                            data.appearences = appearences;
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
    if (agent) { returnAthleteCard(db.addAgentAthleteCard(req.body.object, user.id), res); }
}

exports.change = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    console.log('-------------------------           ' + req.body.id);
    if (agent) { returnAthleteCard(db.changeAgentAthleteCard(req.body.object, req.body.id, user.id), res); }
}

exports.delete = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (agent) {
        db.deleteAgentAthleteCard(req.body.id, user.id)
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

function returnAthleteCard(athleteCardPromise, res) {
    athleteCardPromise.then(athleteCard => {
        db.getCompetitionById(athleteCard.competition_id).then(competition => {
           db.getAthleticsTypeById(athleteCard.athletics_type_id).then(athletic => {
                db.getRankById(athleteCard.rank_id).then(rank => {
                    db.getAppearenceById(athleteCard.appearence_id).then(appearence => {
                        db.getAthleteById(athleteCard.athlete_id).then(athlete => {
                            if (athleteCard) {
                                var data = {
                                    id: athleteCard.id,
                                    row: [
                                        competition.name,
                                        athlete.last_name + " " + athlete.first_name.charAt(0) + "." + athlete.middle_name.charAt(0) + ".",
                                        athletic.name,
                                        athleteCard.current_result,
                                        rank.name
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
        }).catch(() => {
            res.sendStatus(500)
        });
    }).catch(() => {
        res.sendStatus(500)
    });
}