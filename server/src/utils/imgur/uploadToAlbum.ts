import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';
import getAccessToken from './getAccessToken';
import config from '../../config';

const imgurApiUpload = 'https://api.imgur.com/3/upload';

const uploadToAlbum = async (
  name: string,
  description: string,
  image: Express.Multer.File
): Promise<string> => {
  try {
    const token = await getAccessToken();

    const bodyFormData = new FormData();
    bodyFormData.append('title', name);
    bodyFormData.append('description', description);
    bodyFormData.append('image', fs.createReadStream(image.path));
    bodyFormData.append('album', config.imgur.album);

    const { data } = await axios({
      method: 'post',
      url: imgurApiUpload,
      data: bodyFormData,
      headers: {
        ...bodyFormData.getHeaders(),
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return String(data.data.link);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  } finally {
    fs.unlinkSync(image.path);
  }
};

export default uploadToAlbum;
