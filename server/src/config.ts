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
  IMGUR_ALBUM,
  IMGUR_TOKEN,
  GMAIL_LOGIN,
  GMAIL_PASSWORD,
} = process.env;

if (
  !isString(PORT) ||
  !isString(NODE_ENV) ||
  !isString(DB_URL_PROD) ||
  !isString(DB_URL_DEV) ||
  !isString(JWT_KEY) ||
  !isString(IMGUR_ID) ||
  !isString(IMGUR_SECRET) ||
  !isString(IMGUR_ALBUM) ||
  !isString(IMGUR_TOKEN) ||
  !isString(GMAIL_LOGIN) ||
  !isString(GMAIL_PASSWORD)
) {
  console.log('Please provide a valid .env config');
  process.exit(0);
}

const config: Config = {
  port: PORT,
  mode: NODE_ENV,
  database: NODE_ENV === 'production' ? DB_URL_PROD : DB_URL_DEV,
  jwtKey: JWT_KEY,
  imgur: {
    id: IMGUR_ID,
    secret: IMGUR_SECRET,
    album: IMGUR_ALBUM,
    refreshToken: IMGUR_TOKEN,
  },
  gmail: {
    login: GMAIL_LOGIN,
    password: GMAIL_PASSWORD,
  },
};

export default config;
