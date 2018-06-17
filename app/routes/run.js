var runController = require('../controllers/runController');
 
module.exports = function(app) {
    app.get('/run', isLoggedIn, runController.get);
    app.post('/runchecktype', isLoggedIn, runController.checkAthletics);
    app.post('/runresults', isLoggedIn, runController.getResults);
    app.put('/runresult', isLoggedIn, runController.changeOnlyResult);
    app.put('/runfinal', isLoggedIn, runController.changeOnlyResult);
    app.get('/protocol', isLoggedIn, runController.protocol);
    app.get('/tech', isLoggedIn, runController.tech);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
         res.redirect('/');
    }
}