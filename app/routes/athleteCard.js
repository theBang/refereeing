var athleteCardController = require('../controllers/athleteCardController');
 
module.exports = function(app) {
    app.get('/athletecard', isLoggedIn, athleteCardController.get);
    app.get('/athletecards', isLoggedIn, athleteCardController.getOptions);
    app.post('/athletecardchecktype', isLoggedIn, athleteCardController.checkAthletics);

    app.post('/athletecard', isLoggedIn, athleteCardController.add);
    app.delete('/athletecard', isLoggedIn, athleteCardController.delete);
    app.put('/athletecard', isLoggedIn, athleteCardController.change);
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}