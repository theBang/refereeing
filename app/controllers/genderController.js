var db = require('../db');

var exports = module.exports = {}

exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }

    var tableHead;

    if (admin) {
        tableHead = ['ID', 'Пол'];
        db.getGenders().then(genders => {
            res.render('genders.hbs', {
                title: 'Пол',
                tableHead: tableHead,
                genders: genders,
                username: user.email,
                admin: admin,
                judge: judge,
                agent: agent
            });
        }).catch (() => {
            res.sendStatus(500);
        });
    }
};

exports.add = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (admin) { returnGender(db.addGender(req.body.object), res); }
};

exports.change = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    console.log('-------------------------           ' + req.body.id);
    if (agent) { returnAthlete(db.changeAthlete(req.body.object, req.body.id, user.id), res); }

};

exports.delete = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (agent) {
        db.deleteAthlete(req.body.id, user.id).then(deleted => {
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

function returnGender(genderPromise, res) {
    genderPromise.then(gender => {
        console.log('--------------------------------------------------');
        console.log(gender);
        if (gender) {
            console.log(gender);
            var data = {
                id: gender.id,
                row: [
                    gender.id,
                    gender.gender
                ]
            };
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data));
        } else {
            res.sendStatus(500);
        }
    }).catch (() => {
        res.sendStatus(500);
    });
}