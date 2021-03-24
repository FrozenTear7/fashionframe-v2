/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import util from 'util';
import path from 'path';
import User from '../models/User';
import ColorScheme from '../models/ColorScheme';

// https://github.com/zellwk/endpoint-testing-example

const readDir = util.promisify(fs.readdir);

const seedDatabase = async (runSaveMiddleware = false): Promise<void> => {
  const dir = await readDir(__dirname);
  const seedFiles = dir.filter((f) => f.endsWith('.seed.json'));

  for (const file of seedFiles) {
    const fileName = file.split('.seed.json')[0];
    const fileContents = require(path.join(__dirname, file));

    switch (fileName) {
      case 'ColorScheme':
        runSaveMiddleware
          ? await ColorScheme.create(fileContents)
          : await ColorScheme.insertMany(fileContents);
        break;
      case 'User':
        runSaveMiddleware
          ? await User.create(fileContents)
          : await User.insertMany(fileContents);
        break;
      default:
        throw new Error(`Cannot find Model '${fileName}'`);
    }
  }
};

export default seedDatabase;
