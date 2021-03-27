import { exists, isString, isNumber } from './../parseTypes/typeChecks';
import axios from 'axios';
import config from '../../config';

const imgurApiRefresh = 'https://api.imgur.com/oauth2/token';

let currentAccessToken: string | undefined;
let currentExpiresIn = 0;
let lastFetch = Date.now();

const getAccessToken = async (): Promise<string> => {
  if (!currentAccessToken || Date.now() - lastFetch >= currentExpiresIn) {
    const res = await axios({
      method: 'post',
      url: imgurApiRefresh,
      data: {
        refresh_token: config.imgur.refreshToken,
        client_id: config.imgur.id,
        client_secret: config.imgur.secret,
        grant_type: 'refresh_token',
      },
    });

    const token = res.data.access_token;
    const expiresIn = res.data.access_token;

    if (exists(token) && isString(token) && exists(token) && isNumber(token)) {
      currentAccessToken = token;
      currentExpiresIn = expiresIn;
      lastFetch = Date.now();
    } else {
      throw new Error('Error while connecting to Imgur API');
    }
  }

  return currentAccessToken;
};

export default getAccessToken;
