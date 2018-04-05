var competeController = require('../controllers/competeController');
 
module.exports = function(app) {
    app.get('/competition', isLoggedIn, competeController.get);
 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}