var db = require('../lib/db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }

    console.log('Get athletes');
    var tableHead;
    console.log(user.id);
    if (agent) {
        tableHead = ['Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Пол', 'Тренер', 'Город', 'Номер']
        db.getAgentAthletes(user.id).then(athletes => {
            var outAthletes = [];
            athletes.forEach(function(athlete) {
                outAthletes.push({
                    id: athlete.id,
                    number: athlete.number,
                    firstname: athlete.first_name,
                    middlename: athlete.middle_name,
                    lastname: athlete.last_name,
                    birthday: athlete.birthday,
                    coach: athlete.coach,
                    gender: athlete.gender_type.gender_type,
                    city: athlete.city.name,
                });
            });

            res.render('athletes.hbs', {
                title: 'Спортсмены',
                tableHead: tableHead,
                athletes: outAthletes,
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
    
    if(judge) {
        tableHead = ['Организация', 'Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Пол', 'Тренер', 'Город', 'Номер']
        db.getAthletes().then(athletes => {
            var outAthletes = [];
            athletes.forEach(function(athlete) {
                outAthletes.push({
                    id: athlete.id,
                    organization: athlete.organization.name,
                    number: athlete.number,
                    firstname: athlete.first_name,
                    middlename: athlete.middle_name,
                    lastname: athlete.last_name,
                    birthday: athlete.birthday,
                    coach: athlete.coach,
                    gender: athlete.gender_type.gender_type,
                    city: athlete.city.name,
                });
            });

            res.render('athletesJudge.hbs', {
                title: 'Спортсмены',
                tableHead: tableHead,
                athletes: outAthletes,
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
    if (agent) {
        db.getGenders().then(genders => {
            db.getCities().then(cities => {
                var data = {};
                data.genders = genders;
                data.cities = cities;
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(data));
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
    if (agent) { returnAthlete(db.addAthlete(req.body.object, user.id), res); }
}

exports.change = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    console.log('-------------------------           ' + req.body.id);
    if (agent) { returnAthlete(db.changeAthlete(req.body.object, req.body.id, user.id), res); }
    
}

exports.getOptions = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (agent) {
        db.getGenders().then(genders => {
            db.getCities().then(cities => {
                var data = {};
                data.genders = genders;
                data.cities = cities;
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(data));
            }).catch(() => {
                res.sendStatus(500)
            });
        }).catch(() => {
            res.sendStatus(500)
        });
    }
}

exports.delete = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (agent) {
        db.deleteAthlete(req.body.id, user.id)
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

function returnAthlete(athletePromise, res) {
    athletePromise.then(athlete => {
        db.getGenderById(athlete.gender_type_id).then(gender => {
            db.getCityById(athlete.city_id).then(city => {
                if (athlete) {
                    var data = {
                        id: athlete.id,
                        row: [
                            athlete.last_name,
                            athlete.first_name,
                            athlete.middle_name,
                            athlete.birthday,
                            gender.gender_type,
                            athlete.coach,
                            city.name,
                            athlete.number
                        ]
                    };
                    res.status(200);
                    res.setHeader("Content-Type", "application/json");
                    res.send(JSON.stringify(data));
                } else {
                    res.sendStatus(500);
                }
            })
        })
    })
    .catch (() => {
        res.sendStatus(500);
    });    
}