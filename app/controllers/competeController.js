var db = require('../lib/db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false;
    if(role == 'admin') { admin = true; }
    if(role == 'judge') { judge = true; }

    console.log('Get competitions');
    var tableHead = ['Название', 
                    'Летние', 
                    'Главный судья', 
                    'Категория судьи', 
                    'Главный секретарь', 
                    'Категория секретаря',
                    'Действие'];

    db.getCompetitions()
        .then(competitions => {
            res.render('competitions.hbs', {
                title: 'Соревнования',
                tableHead: tableHead,
                competitions: competitions,
                username: user.email,
                admin: admin,
                judge: judge 
            });
        })
        .catch (() => {
            res.sendStatus(500);
        });
}

