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
  !isString(IMGUR_TOKEN)
) {
  console.log('Please provide a valid .env config');
  process.exit(0);
}

const config: Config = {
  port: PORT,
  apiUrl:
    NODE_ENV === 'production'
      ? 'https://fashionframe.herokuapp.com/fashionframe'
      : 'http://localhost:3000/fashionframe',
  webUrl:
    NODE_ENV === 'production'
      ? 'https://fashionframe.herokuapp.com'
      : 'http://localhost:3001',
  database: NODE_ENV === 'production' ? DB_URL_PROD : DB_URL_DEV,
  jwtKey: JWT_KEY,
  imgur: {
    id: IMGUR_ID,
    secret: IMGUR_SECRET,
    album: IMGUR_ALBUM,
    refreshToken: IMGUR_TOKEN,
  },
};

export default config;
