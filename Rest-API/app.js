var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require("helmet");
// var cors = require('cors')

// My import of comments
// const database = require('./data/database');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var taskRouter = require('./routes/task');
// var editRouter = require('./routes/edit');

var app = express();
// Header CSP
app.use(
  helmet.contentSecurityPolicy(
    {
      directives: {
        "default-src": ["'self' http://localhost:8001/"],
        "base-uri": ["'self'"],
        "frame-ancestors":["'self'"],
        "font-src":["'self' https: data:"],
        "img-src":["'self'"],
        "object-src":["'none'"],
        "script-src":["'self' https://code.jquery.com 'unsafe-inline' "],
        "style-src":["'self' https: 'unsafe-inline'"],
      }
    }
  )
)
// Header for CORS


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())
app.disable('etag');



app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/task', taskRouter);
// app.use('/edit', editRouter)

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
  // res.render('error');
});

module.exports = app;
