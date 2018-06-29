var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('moongose');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var routes = require('./routes');
var config = require('./config');



mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.use(bodyParser.json());

app.use(session({
    secret: config.cookieKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);
app.use(handleErrors);
