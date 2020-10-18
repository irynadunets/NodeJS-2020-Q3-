const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const morgan = require('morgan');
const winston = require('./config/winston');
var fs = require('fs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(morgan('combined', { stream: winston.stream }));

app.use((req, res, next) => {
  winston.info(JSON.stringify(req.query));
  next()
})

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    winston.info('requested empty');
    return;
  }
  next();
});

app.use((err, req, res, next) => {
  winston.info('Internal Server Error');
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`captured error: ${error.message}`);
  winston.info('IuncaughtException Error');
});

//throw Error('Oops!');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, `reason: ${reason.message}`);
  winston.info('Unhandled Rejection');
});

//Promise.reject(Error('Oops!'));

app.use('/users', userRouter);
app.use('/boards',boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

module.exports = app;
