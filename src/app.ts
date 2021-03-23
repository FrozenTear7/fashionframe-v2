import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import errorMiddleware from './middleware/errorMiddleware';
import config from './config';
import passport from 'passport';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  expressSession({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', warframeData);
app.use('/setups', setups);

app.use(errorMiddleware);

export default app;
