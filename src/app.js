const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const authenticateJWT = require('./middleware/authenticateJWT');
const morgan = require('morgan');
const winston = require('./config/winston');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));
app.use(morgan( ':method :status :url :query body :body size :res[content-length] - :response-time ms',
{ stream: winston.stream } ) );

app.use((req, res, next) => {
  winston.info(JSON.stringify(req.query));
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    winston.info('requested empty');
    return;
  }
  next();
});

//throw Error(INTERNAL_SERVER_ERROR);

app.use((err, req, res, next) => {
  winston.info('Internal Server Error');
  winston.error(`${err.status || INTERNAL_SERVER_ERROR} - ${err.message}`);
  res.status(INTERNAL_SERVER_ERROR).send('server error, this will be resolved shortly!');
})

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`captured error: ${error.message}`);
  winston.info(`uncaughtException Error: captured error: ${error.message}`);
});

//throw Error('Oops!');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, `reason: ${reason.message}`);
  winston.info(`Unhandled Rejection reason: ${reason.message}`);
});

//Promise.reject(Error('Oops!'));

app.use('/login', loginRouter);
app.use('/users', authenticateJWT, userRouter);
app.use('/boards/:boardId/tasks', authenticateJWT, taskRouter);
app.use('/boards',authenticateJWT, boardRouter);

module.exports = app;
