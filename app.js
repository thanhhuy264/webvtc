const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connection database
const { connection } = require('./database')

const homeRouter = require('./routes/home.route');
const goidichvuRouter = require('./routes/goidichvu.route');
const provincesRouter = require('./routes/provinces.route');
const CTSCaNhanRouter = require('./routes/ctscanhan.route');
const goidichvuAPI = require('./routes/api/goidichvu.api');
const CTSDoanhNghiepRouter = require('./routes/ctsdoanhnghiep.route');
const tinhThanhAPI = require('./routes/api/provinces.api');
const CTSCaNhanAPI = require('./routes/api/ctscanhan.api');
const CTSDoanhNghiepAPI = require('./routes/api/ctsdoanhnghiep.api');

app.use(homeRouter);
app.use(provincesRouter);
app.use(goidichvuRouter);
app.use(CTSCaNhanRouter)
app.use(CTSDoanhNghiepRouter)
app.use('/api', tinhThanhAPI);
app.use('/api', goidichvuAPI)
app.use('/api', CTSCaNhanAPI);
app.use('/api', CTSDoanhNghiepAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
