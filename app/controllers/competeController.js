var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Название', 
        'Дата проведения', 
        'Место проведения', 
        'Главный судья', 
        'Главный секретарь'
    ];
    if(role == 'admin') { admin = true; }
    if(role == 'agent') { agent = true; }
    if(role == 'judge') { 
        judge = true; 
        tableHead.push('Количество дорожек');
        tableHead.push('Действие');
    }

    console.log('Get competitions');
    

    db.getCompetitions()
        .then(competitions => {
            var competitionHbs;
            if (judge || admin) { competitionHbs = 'competitionsEdit.hbs' } 
            else { competitionHbs = 'competitions.hbs' }
            competitions.forEach(competition => {
                competition.competition_date_start = competition.competition_date_start.toDateString();
            });
            res.render(competitionHbs, {
                title: 'Соревнования',
                tableHead: tableHead,
                competitions: competitions,
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

exports.getUnsigned = function(req, res) {
    var admin = false, judge = false, agent = false;
    var tableHead = [
        'Название', 
        'Дата проведения', 
        'Место проведения', 
        'Главный судья', 
        'Главный секретарь'
    ];
    
    db.getCompetitions()
        .then(competitions => {
            competitions.forEach(competition => {
                competition.competition_date_start = competition.competition_date_start.toDateString();
            });
            res.render('competitions.hbs', {
                title: 'Соревнования',
                tableHead: tableHead,
                competitions: competitions,
                admin: admin,
                judge: judge,
                agent: agent,
                unsigned: true
            });
        })
        .catch (() => {
            res.sendStatus(500);
        });
}

exports.add = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (admin || judge) { 
        returnCompetition(db.addCompetition(req.body.object), res); 
    }
}

exports.change = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (admin || judge) { returnCompetition(db.changeCompetition(req.body.object, req.body.id), res); }
}

exports.delete = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (admin || judge) {
        db.deleteCompetition(req.body.id)
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

function returnCompetition(competitionPromise, res) {
    competitionPromise.then(competition => {
        if (competition) {
            console.log(competition.competition_date_start)
            var data = {
                id: competition.id,
                row: [
                    competition.name,
                    competition.competition_date_start,
                    competition.place,
                    competition.main_referee,
                    competition.main_secretary,
                    competition.track_count
                ]
            };
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
        } else {
            res.sendStatus(500);
        }
    })
    .catch (() => {
        res.sendStatus(500);
    });    
}