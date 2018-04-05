var db = require('../lib/db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    console.log('Get organizations');
    var tableHead = ['Код', 'Наименование', 'Командная борьба', 'Действие'];

    db.getOrg()
        .then(organizations => {
            res.render('organizations.hbs', {
                title: 'Организации',
                tableHead: tableHead,
                organizations: organizations
            });
        })
        .catch (() => {
            res.sendStatus(500);
        });
}

