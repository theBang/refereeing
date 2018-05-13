var orgController = require('../controllers/orgController');
 
module.exports = function(app) {
    app.get('/organization', isLoggedIn, orgController.get);
    app.post('/organization', isLoggedIn, orgController.add);
    //app.delete('/organization', isLoggedIn, orgController.delete);
    //app.put('/organization', isLoggedIn, orgController.change);
 
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}