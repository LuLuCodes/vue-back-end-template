/**
 * @author qianqing
 * @create by 16-4-23
 * @description
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var ejs = require('ejs');
var index = require('./routes/index');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(compression());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '', 'favicon.ico')));
app.use(logger.express);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser('myunweb_'));

app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
    db: 2
  }),
  secret: 'MYun 123!@# web',
  key: 'sid',
  cookie: { secure: false, maxAge: 3 * 24 * 3600 * 1000 },
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(__dirname));

//处理webpack服务请求
app.get('/__webpack_hmr', function(res, res) {
  res.send('')
})
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
