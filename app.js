const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const adminApiRouter = require('./routes/admin-api');
const authRoutes = require('./routes/auth');
const validRoutes = require('./routes/validation');
const adminAuthRoutes = require('./routes/admin-auth');

const auth = require('./middlewares/auth');
const adminAuth = require('./middlewares/admin-auth');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



// app.use('/', indexRouter);
app.use('/api', authRoutes);
app.use('/api', validRoutes);
app.use('/api', apiRouter);

app.use('/admin', adminAuthRoutes);
app.use('/admin/api', adminAuth, adminApiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
