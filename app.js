var express = require('express');
const cors = require('cors');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var HandlerGenerator = require("./routes/handlegenerator.js");
var middleware = require("./routes/middleware.js");

HandlerGenerator = new HandlerGenerator();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', middleware.checkToken, indexRouter);
app.get('/check', middleware.checkToken, HandlerGenerator.index);
app.post( '/login', HandlerGenerator.login);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

module.exports = app;
