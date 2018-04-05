var express = require('express'); //Подключение Express
var hbs = require('hbs');
var app = express(); //Создание объекта приложения
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var bCrypt = require('bcrypt-nodejs');

//Add Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add Passport
app.use(session({ 
    secret: 'superSecret', 
    resave: true, 
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Add path to static files
app.use(express.static(__dirname + '/public'));

//Add hbs
app.set('views', './app/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/app/views/partials')

//Models
var models = require('./app/models');

//Routes
var authRoute = require('./app/routes/auth')(app, passport);
var competeRoute = require('./app/routes/compete')(app);
var orgRoute = require('./app/routes/org')(app);
var usersRoute = require('./app/routes/users')(app);
var mainRoute = require('./app/routes/main')(app);
var athleteRoute = require('./app/routes/athlete')(app);
var athleteCardRoute = require('./app/routes/athleteCard')(app);
//Load passport strategies
require('./app/config/passport/passport')(passport, models.user, models.organization);

//Sync Database
models.sequelize.sync().then(function() {
    /*models.city.create({
        name: 'Пермь'
    });*/
    /*models.appearence.create({
        name: 'В команде'
    }).then(() => {
        models.appearence.create({
            name: 'Лично'
        });
    });*/
    console.log(' ');
    console.log('Nice! Database looks fine');
    console.log(' ');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.get('/', isLoggedInMain, function(req, res){
    var user = req.user;
    res.render('index.hbs', {
        title: 'Главная',
        username: user.email
    });
});

function isLoggedInMain(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.render('indexUnsigned.hbs', {
        title: 'Главная'
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

app.get('/genders', isLoggedIn, function(req, res) {
    console.log('/nRoute: /genders/n');
    var tableHead = ['Пол', 'Пол Участника', 'Действие'];
    getObjects(models.gender)
        .then(genders => {
            res.render('genders.hbs', {
                title: 'Пол',
                tableHead: tableHead,
                genders: genders
            });
        })
        .catch (() => {
            res.send(JSON.stringify([]));
        });
});

app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.listen(3000, function(err) {
    if(!err) 
        console.log('Server started');
    else console.log(err);
});

function getObjects (Model) {
    return new Promise ((resolve, reject) => {
        models.sequelize.sync()
            .then(() => {
                Model.findAll().then(objects => {
                    if (objects) {
                        resolve(objects);
                    }
                    reject([]);
                })
            })
            .catch(()=> {
                reject([]);
            })
    });
}