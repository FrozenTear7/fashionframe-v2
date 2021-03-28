import express from 'express';
import auth from './routes/auth';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import errorMiddleware from './middleware/errorMiddleware';
import helmet from 'helmet';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use('/users', auth);
app.use('/api', warframeData);
app.use('/setups', setups);

app.use(errorMiddleware);

export default app;
