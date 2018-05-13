var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Номер забега', 
        'Дата проведения', 
        'Место проведения', 
        'Главный судья', 
        'Главный секретарь'
    ];
    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
        db.getCompetitions().then(competitions => {
            db.getCompetitionTypeByCompetition(competitions[0].id).then(competitionTypes => {
                res.render('run_result.hbs', {
                    title: 'Результаты бег',
                    tableHead: tableHead,
                    username: user.email,
                    competitions: competitions,
                    athletics: competitionTypes,
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
    }  
}

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
}

           