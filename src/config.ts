import { isString } from './utils/parseTypes/typeChecks';
import { Config } from './types';
import dotenv from 'dotenv';

dotenv.config();

// .env config

const { PORT, NODE_ENV, DB_URL_PROD, DB_URL_DEV, JWT_KEY } = process.env;

if (
  !isString(PORT) ||
  !isString(NODE_ENV) ||
  !isString(DB_URL_PROD) ||
  !isString(DB_URL_DEV) ||
  !isString(JWT_KEY)
) {
  console.log('Please provide a valid .env config');
  process.exit(0);
}

// Options passed to the Twitch client

const config: Config = {
  port: PORT,
  apiUrl:
    NODE_ENV === 'production'
      ? 'https://fashionframe.herokuapp.com/fashionframe'
      : 'http://localhost:8000/fashionframe',
  webUrl:
    NODE_ENV === 'production'
      ? 'https://fashionframe.herokuapp.com'
      : 'http://localhost:8001',
  database: {
    production: DB_URL_PROD,
    development: DB_URL_DEV,
  },
  jwtKey: JWT_KEY,
};

export default config;
