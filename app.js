var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientRouter = require("./routes/client");
var categorieController = require("./routes/categorie");
var wagonController = require("./routes/wagon");
var trainRouter = require("./routes/train");
var voyageRouter = require("./routes/voyage");
var app = express();

app.use(cors())
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/client', clientRouter);
app.use('/api/categorie', categorieController);
app.use('/api/wagons', wagonController);
app.use("/api/train", trainRouter)
app.use("/api/voyage", voyageRouter)
module.exports = app;
