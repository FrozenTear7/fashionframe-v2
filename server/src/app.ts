import express from 'express';
import auth from './routes/auth';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import errorMiddleware from './middleware/errorMiddleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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
app.use(helmet());

app.use('/users', limiters.users, auth);
app.use('/api', limiters.api, warframeData);
app.use('/setups', limiters.setups, setups);

app.use(errorMiddleware);

export default app;
