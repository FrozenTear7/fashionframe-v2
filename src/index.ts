import app from './app';
import config from './config';
import mongoose from 'mongoose';

void (async () => {
  await mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.listen(config.port, () => {
    console.log(`Fashionframe server is running on port ${config.port}`);
  });
})();
