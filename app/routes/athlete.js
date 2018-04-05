var athleteController = require('../controllers/athleteController');
 
module.exports = function(app) {
    app.get('/athlete', isLoggedIn, athleteController.get);

    app.get('/athletes', isLoggedIn, athleteController.getOptions);
    app.post('/athlete', isLoggedIn, athleteController.add);
    app.delete('/athlete', isLoggedIn, athleteController.delete);
    app.put('/athlete', isLoggedIn, athleteController.change);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}