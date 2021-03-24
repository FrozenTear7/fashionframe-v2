/* eslint-disable @typescript-eslint/no-var-requires */
import { IUser } from './../models/User';
import fs from 'fs';
import util from 'util';
import path from 'path';
import User from '../models/User';
import ColorScheme from '../models/ColorScheme';
import Setup from '../models/Setup';
import Attachments from '../models/Attachments';
import Syandana from '../models/Syandana';

// https://github.com/zellwk/endpoint-testing-example

const readDir = util.promisify(fs.readdir);

let users: IUser[] = [];

const seedDatabase = async (): Promise<void> => {
  const dir = await readDir(__dirname);
  const seedFiles = dir
    .filter((f) => f.endsWith('.seed.json'))
    .sort()
    .reverse(); // Kind of stupid, but we want User to go before Setup

  for (const file of seedFiles) {
    const fileName = file.split('.seed.json')[0];
    const fileContents = require(path.join(__dirname, file));

    switch (fileName) {
      case 'ColorScheme':
        for (const colorScheme of fileContents) {
          await ColorScheme.create(colorScheme);
        }
        break;
      case 'User':
        for (const user of fileContents) {
          users = [...users, await User.create(user)];
        }
        break;
      case 'Setup':
        for (const setupContent of fileContents) {
          const { attachments, syandana, colorScheme, ...setup } = setupContent;

          await Setup.create({
            user: users[0]._id,
            attachments: await Attachments.create({
              ...attachments,
              colorScheme: await ColorScheme.create(attachments.colorScheme),
            }),
            syandana: await Syandana.create({
              ...syandana,
              colorScheme: await ColorScheme.create(syandana.colorScheme),
            }),
            colorScheme: await ColorScheme.create(colorScheme),
            ...setup,
          });
        }
        break;
      default:
        console.error('Unknown seed model');
    }
  }
};

export default seedDatabase;
