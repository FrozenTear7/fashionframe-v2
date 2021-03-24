import fs from 'fs';
import util from 'util';
import path from 'path';
import mongoose from 'mongoose';

// https://github.com/zellwk/endpoint-testing-example

const readDir = util.promisify(fs.readdir);

const seedDatabase = async (runSaveMiddleware = false): Promise<void> => {
  const dir = await readDir(__dirname);
  const seedFiles = dir.filter((f) => f.endsWith('.seed.json'));

  for (const file of seedFiles) {
    const fileName = file.split('.seed.json')[0];
    const modelName = `${fileName[0].toUpperCase()}${fileName.substr(1)}`;
    const model = mongoose.models[modelName];

    if (!model) throw new Error(`Cannot find Model '${modelName}'`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fileContents = require(path.join(__dirname, file));

    runSaveMiddleware
      ? await model.create(fileContents)
      : await model.insertMany(fileContents);
  }
};

export default seedDatabase;
