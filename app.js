const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const adminApiRouter = require('./routes/adminApi');
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');

const auth = require('./middlewares/auth');
const admin_auth = require('./middlewares/adminAuth');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/admin/', adminAuthRoutes);
app.use('/admin/api', admin_auth, adminApiRouter);

// app.use('/', indexRouter);
app.use('/api', authRoutes);
app.use('/api', auth, apiRouter);

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
