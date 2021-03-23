import express from 'express';
import warframeData from './routes/warframeData';
import setups from './routes/setups';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', warframeData);
app.use('/setups', setups);

app.use(errorMiddleware);

export default app;
