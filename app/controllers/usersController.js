var db = require('../db');

var exports = module.exports = {}
 
exports.get = function(req, res) {
    console.log('Get users');
    var tableHead = ['id', 'email', 'Имя', 'Фамилия', 'Роль'];

    db.getUsers()
        .then(users => {
            res.render('users.hbs', {
                title: 'Пользователи',
                tableHead: tableHead,
                users: users
            });
        })
        .catch (() => {
            res.sendStatus(500);
        });
}

