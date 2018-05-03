var competeTypeController = require('../controllers/competeTypeController');
 
module.exports = function(app) {
    app.get('/competitiontype', isLoggedIn, competeTypeController.get);
    app.post('/competitiontype', isLoggedIn, competeTypeController.add);
    app.delete('/competitiontype', isLoggedIn, competeTypeController.delete);
    app.put('/competitiontype', isLoggedIn, competeTypeController.change);

    app.get('/competitiontypes', isLoggedIn, competeTypeController.getOptions);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}