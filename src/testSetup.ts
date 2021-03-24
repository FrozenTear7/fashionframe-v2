import { isString } from './utils/parseTypes/typeChecks';
import seedDatabase from './seeds';
import mongoose from 'mongoose';

const removeAllCollections = async (): Promise<void> => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
};

const dropAllCollections = async (): Promise<void> => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (e) {
      let message = '';
      if (e instanceof Error) {
        message = e.message;
      } else if (isString(e)) {
        message = e;
      }

      if (message === 'ns not found') return;
      if (message.includes('a background operation is currently running'))
        return;

      console.log(message);
    }
  }
};

export const setupDB = (runSaveMiddleware = false): void => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  beforeEach(async () => {
    await seedDatabase(runSaveMiddleware);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.disconnect();
  });
};
