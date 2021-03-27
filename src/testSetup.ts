import jwt from 'jsonwebtoken';
import { isString } from './utils/parseTypes/typeChecks';
import seedDatabase from './seeds';
import mongoose, { Types } from 'mongoose';
import config from './config';
import User, { IUser } from './models/User';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

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

export const authorizedRequest = async (): Promise<{
  Authorization: string;
}> => {
  const user = await User.findByCredentials('TestUsername', 'TestPassword');
  const token = jwt.sign({ _id: user._id }, config.jwtKey);

  user.tokens = [...user.tokens, { token }];
  await user.save();

  return { Authorization: `Bearer ${token}` };
};

export const getTestAuthor = async (): Promise<IUser> => {
  const user = await User.findByCredentials('TestUsername', 'TestPassword');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user;
};

export const getTestAuthorId = async (): Promise<Types.ObjectId> => {
  const user = await User.findByCredentials('TestUsername', 'TestPassword');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user._id;
};

export const setupDB = (): void => {
  let replSet: MongoMemoryReplSet;

  beforeAll(async () => {
    replSet = new MongoMemoryReplSet({
      replSet: { storageEngine: 'wiredTiger' },
    });
    await replSet.waitUntilRunning();
    const uri = await replSet.getUri();
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );

    // await mongoose.connect(
    //   config.database,
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //     useCreateIndex: true,
    //   },
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       process.exit(1);
    //     }
    //   }
    // );
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
    await seedDatabase();
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.disconnect();
    await replSet.stop();
  });
};
