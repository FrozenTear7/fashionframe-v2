import { isString } from './utils/parseTypes/typeChecks';
import { Config } from './types';
import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  DB_URL_PROD,
  DB_URL_DEV,
  JWT_KEY,
  IMGUR_ID,
  IMGUR_SECRET,
} = process.env;

if (
  !isString(PORT) ||
  !isString(NODE_ENV) ||
  !isString(DB_URL_PROD) ||
  !isString(DB_URL_DEV) ||
  !isString(JWT_KEY) ||
  !isString(IMGUR_ID) ||
  !isString(IMGUR_SECRET)
) {
  console.log('Please provide a valid .env config');
  process.exit(0);
}

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
  database: NODE_ENV === 'production' ? DB_URL_PROD : DB_URL_DEV,
  jwtKey: JWT_KEY,
  imgur: {
    id: IMGUR_ID,
    secret: IMGUR_SECRET,
  },
};

export default config;
