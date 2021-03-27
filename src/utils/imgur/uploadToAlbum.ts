import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const imgurApiUpload = 'https://api.imgur.com/3/upload';
const token = 'TOKEN HERE :)';

const uploadToAlbum = async (
  name: string,
  description: string,
  image: Express.Multer.File
): Promise<string> => {
  const bodyFormData = new FormData();
  bodyFormData.append('title', name);
  bodyFormData.append('description', description);
  bodyFormData.append('image', fs.createReadStream(image.path));

  const res = await axios({
    method: 'post',
    url: imgurApiUpload,
    data: bodyFormData,
    headers: {
      ...bodyFormData.getHeaders(),
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  fs.unlinkSync(image.path);

  return String(res.data.data.link);
};

export default uploadToAlbum;
