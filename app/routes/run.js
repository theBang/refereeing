var runController = require('../controllers/runController');
 
module.exports = function(app) {
    app.get('/run', isLoggedIn, runController.get);
    app.post('/runchecktype', isLoggedIn, runController.checkAthletics);
    app.post('/runresults', isLoggedIn, runController.getResults);
    app.put('/runresult', isLoggedIn, runController.changeOnlyResult);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
         res.redirect('/');
    }
}