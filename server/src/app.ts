import express from 'express';
import auth from './routes/auth';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import config from './config';
import errorMiddleware from './middleware/errorMiddleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();

const limiters = {
  users: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minute window
    max: 50, // start blocking after 5 requests
    message:
      'Too many user requests from this IP, please try again in 5 minutes',
  }),
  api: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minute window
    max: 1000, // start blocking after 5 requests
    message:
      'Too many API requests from this IP, please try again in 5 minutes',
  }),
  setups: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minute window
    max: 500, // start blocking after 5 requests
    message:
      'Too many setups requests from this IP, please try again in 5 minutes',
  }),
};

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(
  csrf({
    cookie: true,
  })
);

if (config.mode === 'production')
  app.use(express.static(path.join(__dirname, 'clientBuild')));
else app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/users', limiters.users, auth);
app.use('/api/data', limiters.api, warframeData);
app.use('/api/setups', limiters.setups, setups);

// Server the client on all other paths except for api
app.get(/^\/(?!api).*$/, (_req, res) => {
  if (config.mode === 'production')
    res.sendFile(path.join(__dirname, '../clientBuild', 'index.html'));
  else res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.use(errorMiddleware);

export default app;
