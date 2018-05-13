var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false, agent = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }
    if(role == 'agent') { agent = true; }
    if (judge) {
        console.log('Get organizations');
        var tableHead = ['Код', 'Наименование', 'Командная борьба'];

        db.getOrg().then(organizations => {
                organizations.forEach(organization => {
                    if(organization.team_fight) {
                        organization.team_fight = 'Да';
                    } else {
                        organization.team_fight = 'Нет';
                    }
                });
                res.render('organizations.hbs', {
                    title: 'Организации',
                    tableHead: tableHead,
                    organizations: organizations,
                    admin: admin,
                    judge: judge,
                    username: user.email
                });
            })
            .catch (() => {
                res.sendStatus(500);
            });
    }

    if (admin) {
        console.log('Get organizations');
        var tableHead = ['ID', 'Наименование', 'Командная борьба', 'User ID'];

        db.getOrg().then(organizations => {
            res.render('organizations.hbs', {
                title: 'Организации',
                tableHead: tableHead,
                organizations: organizations,
                admin: admin,
                judge: judge,
                username: user.email
            });
        }).catch (() => {
            res.sendStatus(500);
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

    if (admin) {
        console.log('Get organizations');
        var tableHead = ['ID', 'Наименование', 'Командная борьба', 'User ID'];

        db.add().then(organizations => {
            res.render('organizations.hbs', {
                title: 'Организации',
                tableHead: tableHead,
                organizations: organizations,
                admin: admin,
                judge: judge,
                username: user.email
            });
        }).catch (() => {
            res.sendStatus(500);
        });
    }
}

