var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }

    var tableHead = ['Соревнование', 'Спортсмен', 'Вид спорта', 'Лучший результат', 'Разряд'];
    var renderPage;

    if(judge) {
        renderPage = 'athlete_cardJudge.hbs';
        db.getAthleteCards().then(athleteCards => {
            var outAthleteCards = [];
            athleteCards.forEach(athleteCard => {  
                outAthleteCards.push({
                    id: athleteCard.id,
                    competition: athleteCard.competition_type.competition.name,
                    athlete: athleteCard.athlete.last_name + " " + athleteCard.athlete.first_name.charAt(0) + "." + athleteCard.athlete.middle_name.charAt(0) + ".",
                    athletics: athleteCard.competition_type.athletics_type.name,
                    result: athleteCard.current_result,
                    rank: athleteCard.rank.name
                });
            });

            res.render(renderPage, {
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
    }
    
    if (agent) {
        tableHead.push('Действие');
        renderPage = 'athlete_card.hbs';
        
        db.getAgentAthleteCards(user.id).then(athleteCards => {
            var outAthleteCards = [];
            athleteCards.forEach(athleteCard => {  
                outAthleteCards.push({
                    id: athleteCard.id,
                    competition: athleteCard.competition_type.competition.name,
                    athlete: athleteCard.athlete.last_name + " " + athleteCard.athlete.first_name.charAt(0) + "." + athleteCard.athlete.middle_name.charAt(0) + ".",
                    athletics: athleteCard.competition_type.athletics_type.name,
                    result: athleteCard.current_result,
                    rank: athleteCard.rank.name
                });
            });

            res.render(renderPage, {
                title: 'Карточки спортсменов',
                tableHead: tableHead,
                athleteCards: outAthleteCards,
                username: user.email,
                admin: admin,
                judge: judge,
                agent: agent
            });
        }).catch (() => {
            res.status(500);
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
    if (agent) {
        db.getAgentAthletes(user.id).then(athletes => {
            db.getCompetitions().then(competitions => {
                db.getRank().then(ranks => {
                    var data = {};

                    data.athletes = athletes;
                    data.competitions = competitions;
                    data.ranks = ranks;

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

exports.checkAthletics = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }

    if (agent) {
        db.getCardAthletics(req.body.competition, req.body.athlete).then(competitionTypes => {
            var data = { athletics: competitionTypes };
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
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
        db.deleteAgentAthleteCard(req.body.id, user.id).then(deleted => {
            if (deleted) {
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({ id: req.body.id }));
            } else {
                res.sendStatus(500);
            }
        }).catch (() => {
            res.sendStatus(500);
        });    
    }
}

function returnAthleteCard(athleteCardPromise, res) {
    athleteCardPromise.then(athleteCard => {
        db.getCompetitionTypeById(athleteCard.competition_type_id).then(competitionType => {
            db.getCompetitionById(competitionType.competition_id).then(competition => {
                db.getAthleticsTypeById(competitionType.athletics_type_id).then(athletic => {
                    db.getRankById(athleteCard.rank_id).then(rank => {
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