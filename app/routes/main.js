var mainController = require('../controllers/mainConroller');
module.exports = function(app) {
    app.get('/', isLoggedIn, mainController.renderMain);
    app.get('/profile', isLoggedIn, mainController.renderProfile);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/competition'); 
    }
}
