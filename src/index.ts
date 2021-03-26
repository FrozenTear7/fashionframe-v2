import app from './app';
import config from './config';
import mongoose from 'mongoose';

void (async (): Promise<void> => {
  try {
    await mongoose.connect(config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`Connected to Fashionframe database: ${config.database}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`Fashionframe server is running on port ${config.port}`);
  });
})();
