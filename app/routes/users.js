var usersController = require('../controllers/usersController');
 
module.exports = function(app) {
    app.get('/users', isAdmin, usersController.get);
 
    function isAdmin(req, res, next) {
        if (req.isAuthenticated()) { 
            var user = req.user;
            if (user.role == 'admin')
                return next(); 
        }
        res.redirect('/');
    }
}