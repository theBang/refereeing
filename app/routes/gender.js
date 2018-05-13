var genderController = require('../controllers/genderController');

module.exports = function(app) {
    app.get('/gender', isLoggedIn, genderController.get);
    app.post('/gender', isLoggedIn, genderController.add);
    app.delete('/gender', isLoggedIn, genderController.delete);
    app.put('/gender', isLoggedIn, genderController.change);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}