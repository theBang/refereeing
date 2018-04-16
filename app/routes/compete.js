var competeController = require('../controllers/competeController');
 
module.exports = function(app) {
    app.get('/competition', isLoggedIn, competeController.get);
    app.post('/competition', isLoggedIn, competeController.add);
    app.delete('/competition', isLoggedIn, competeController.delete);
    app.put('/competition', isLoggedIn, competeController.change);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        competeController.getUnsigned(req, res);
    }
}