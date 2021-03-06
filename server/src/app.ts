import express from 'express';
import users from './routes/users';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import config from './config';
import errorMiddleware from './middleware/errorMiddleware';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';

const app = express();

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
app.use(cookieParser());
app.use(
  csrf({
    cookie: true,
  })
);

if (config.mode === 'production') {
  app.use(express.static(path.join(__dirname, '../clientBuild')));
  app.use(express.static(path.join(__dirname, '../public')));
} else {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use('/api/users', users);
app.use('/api/data', cors(), warframeData);
app.use('/api/setups', setups);

// serve the sitemap
app.get('/sitemap.xml', (_req, res) => {
  if (config.mode === 'production')
    res.sendFile(path.join(__dirname, '../public/sitemap.xml'));
  else res.sendFile(path.join(__dirname, 'public/sitemap.xml'));
});

// Server the client on all other paths except for api
app.get(/^\/((?!(api|sitemap)).*)$/, (_req, res) => {
  if (config.mode === 'production')
    res.sendFile(path.join(__dirname, '../clientBuild', 'index.html'));
  else res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.use(errorMiddleware);

export default app;
