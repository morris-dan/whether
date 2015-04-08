/**
 * Web application for retrieving weather forecasts from develope.forecast.io 
 * @author Dan Morris
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Application code
var routes = require('./routes/index');
// Used by helpers
var moment = require('moment');

// Express based http server
var app = express();

// Declare some view helpers.
app.locals.lat_lng_helper = function(lat,lng) {
    return Math.abs(lat) + '&deg;' + (lat < 0 ? 'E' : 'W') + ', ' + Math.abs(lng) + '&deg;' + (lng < 0 ? 'S' : 'N');
};
app.locals.time_helper = function(utcSeconds) {
    return moment.unix(utcSeconds).format("M/D/YYYY hh:mm a");
};
app.locals.date_helper = function(utcSeconds) {
    return moment.unix(utcSeconds).format("dddd Do MMMM, YYYY");
};
app.locals.temp_helper = function(degreeUnits, temperature) {
    return Math.round(temperature).toString() + '&deg;' + degreeUnits;
};
app.locals.capitalise_helper = function(word) {
    return word[0].toUpperCase() + word.substring(1);
};

// Setup Jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup runtime environment variables
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Setup http server
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup route handler
app.use('/', routes);

/// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// Error handlers

// Development error handler
// Will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
