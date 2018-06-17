var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Номер забега', 
        'Номер дорожки',
        'Спортсмен',
        'Результаты'
    ];
    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
        db.getCompetitions().then(competitions => {
            db.getCompetitionTypeByCompetition(competitions[0].id).then(competitionTypes => {
                db.getCompetitionTypesResults(competitionTypes[0].id).then(runResults => {
                    
                    var outResults = [];
                    runResults.forEach(result => {
                        var outResult = {};
                        if (result.disqualification) {
                            outResult.result = 'Дисквалификация';
                        } else {
                            if(!result.result) {
                                outResult.result = '';
                            } else {
                                outResult.result = result.result.toISOString().substr(11, 12);
                            }
                        }
                        
                        outResult.id = result.id;
                        outResult.run = result.run.number;
                        outResult.track = result.track;
                        outResult.name = result.athlete_card.athlete.last_name + ' ' + result.athlete_card.athlete.first_name[0] + '. ' + result.athlete_card.athlete.middle_name[0] + '.';

                        outResults.push(outResult);
                    });

                    console.log(outResults);

                    res.render('run_result.hbs', {
                        title: 'Результаты бег',
                        tableHead: tableHead,
                        username: user.email,
                        competitions: competitions,
                        athletics: competitionTypes,
                        results: outResults,
                        admin: admin,
                        judge: judge,
                        agent: agent
                    });
                }).catch(() => {
                    res.sendStatus(500);
                });
            }).catch(() => {
                res.sendStatus(500);
            });
        }).catch(() => {
            res.sendStatus(500);
        });
    }  
};

exports.tech = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Номер забега', 
        'Номер дорожки',
        'Спортсмен',
        'Результаты'
    ];
    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
       

        res.render('tech_result.hbs', {
            title: 'Результаты технических видов',
            username: user.email,
            admin: admin,
            judge: judge,
            agent: agent
        });
               
    }  
};

exports.protocol = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    
    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
    
        res.render('protocol.hbs', {
            title: 'Итоговые протоколы',
            username: user.email,
            admin: admin,
            judge: judge,
            agent: agent
        });
               
    }  
};

exports.startFinal = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Номер забега', 
        'Номер дорожки',
        'Спортсмен',
        'Результаты'
    ];

    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
        db.getCompetitions().then(competitions => {
            db.getCompetitionTypeByCompetition(competitions[0].id).then(competitionTypes => {
                db.getCompetitionTypesResults(competitionTypes[0].id).then(runResults => {
                    
                    var outResults = [];
                    runResults.forEach(result => {
                        var outResult = {};
                        if(!result.result) {
                            outResult.result = '';
                        } else {
                            outResult.result = result.result.toISOString().substr(11, 12);
                        }
                        outResult.id = result.id;
                        outResult.run = result.run.number;
                        outResult.track = result.track;
                        outResult.name = result.athlete_card.athlete.last_name + ' ' + result.athlete_card.athlete.first_name[0] + '. ' + result.athlete_card.athlete.middle_name[0] + '.';

                        outResults.push(outResult);
                    });

                    console.log(outResults);

                    res.render('run_result.hbs', {
                        title: 'Результаты бег',
                        tableHead: tableHead,
                        username: user.email,
                        competitions: competitions,
                        athletics: competitionTypes,
                        results: outResults,
                        admin: admin,
                        judge: judge,
                        agent: agent
                    });
                }).catch(() => {
                    res.sendStatus(500);
                });
            }).catch(() => {
                res.sendStatus(500);
            });
        }).catch(() => {
            res.sendStatus(500);
        });
    }  
};

exports.checkAthletics = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }


    if (judge) {
        db.getCompetitionTypeByCompetition(req.body.competition).then(competitionTypes => {
            var data = { athletics: competitionTypes };
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
        }).catch(() => {
            res.sendStatus(500);
        });

    }
};

exports.getResults = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;

    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }


    if (judge) {
        db.getCompetitionTypesResults(req.body.competition_type).then(runResults => {
            var data = { results: runResults };
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
        }).catch(() => {
            res.sendStatus(500);
        });

    }
};

exports.changeOnlyResult = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;

    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }


    if (judge) {
        db.changeOnlyResult(req.body.id, req.body.result).then(result => {

            var data = { result: result.toISOString().substr(11, 12) };

            console.log(data);
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
        }).catch(() => {
            res.sendStatus(500);
        });

    }
};
           