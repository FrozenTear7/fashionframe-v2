import express from 'express';
import warframeData from './routes/warframeData';

const app = express();

app.use(express.json());

app.use('/api', warframeData);

export default app;
