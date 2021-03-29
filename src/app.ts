import express, { Application } from 'express';
const cors = require('cors');
import userRouter from './routers/users.router';
import groupRouter from './routers/groups.router';
import logger from './logger';
import logError from './middleware/logError';
import logMethodAndArgs from './middleware/logMethodAndArgs';
import config from './config';
import init from './config/init';
import corsSettings from './cors-settings';


init().then(() => process.stdout.write('Initial state has been set\n'));
const app: Application = express();
const PORT: number = Number(config.port) || 3000;

app.use(cors(corsSettings));
app.use(express.json());
app.use(logMethodAndArgs);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(logError);
app.listen(PORT);

process.on('uncaughtException', (err: Error) => {
    logger.log({
        level: 'error',
        message: `[Inside 'uncaughtException' event] ${err.stack || err.message}`
    });
    process.exit(0);
});

process.on('unhandledRejection', (err: Error) => {
    logger.log({
        level: 'error',
        message: `[Inside 'unhandledRejection' event] ${err.message}`
    });
    process.exit(0);
});
