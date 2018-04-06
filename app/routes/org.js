var orgController = require('../controllers/orgController');
 
module.exports = function(app) {
    app.get('/organization', isLoggedIn, orgController.get);
 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}