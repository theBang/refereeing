var exports = module.exports = {}
 
exports.renderMain = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false;
    var page = 'index';
    if(role == 'admin') { admin = true; }
    //if(role == 'judge') { judge = true; }
    if(role == 'agent' || role == 'judge') { res.redirect('/competition'); }
    //if(role == 'athlete') {}

    res.render(page, {
        title: 'Главная',
        username: user.email,
        admin: admin,
        judge: judge
    });
}  

exports.renderProfile = function(req, res) {
    var user = req.user;
    var role = user.role;
    var admin = false, judge = false;
    var page = 'index';
    //if(role == 'admin') { admin = true; }
    //if(role == 'judge') { judge = true; }
    if(role == 'agent') { res.redirect('/athlete'); }
    //if(role == 'athlete') {}
/*
    res.render(page, {
        title: 'Главная',
        username: user.email,
        admin: admin,
        judge: judge
    });*/
}  
 