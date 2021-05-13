const hbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookeiParser = require('cookie-parser');
const flash = require('connect-flash');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '../../public')));
    app.use(cookeiParser());
    app.use(session({
        secret: 'awsedfwsdeyg64454edffg54r5ty',
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 6000}
    }));
    app.use(flash());
}