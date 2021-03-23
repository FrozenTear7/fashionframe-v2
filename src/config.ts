import { isString } from './utils/parseTypes/typeChecks';
import { Config } from './types';
import dotenv from 'dotenv';

dotenv.config();

// .env config

const { PORT, DB_URL, SESSION_SECRET } = process.env;

if (!isString(PORT) || !isString(DB_URL) || !isString(SESSION_SECRET)) {
  console.log('Please provide a valid .env config');
  process.exit(0);
}

// Options passed to the Twitch client

const config: Config = {
  port: PORT,
  database: {
    url: DB_URL,
  },
  session: {
    secret: SESSION_SECRET,
  },
};

export default config;
