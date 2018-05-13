var runController = require('../controllers/runController');
 
module.exports = function(app) {
    app.get('/run', isLoggedIn, runController.get);
    app.post('/runchecktype', isLoggedIn, runController.checkAthletics);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
         res.redirect('/');
    }
}