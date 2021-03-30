import axios from 'axios';

export const signIn = async (
  username: string,
  password: string
): Promise<void> => {
  await axios.post('/api/users/login', {
    username,
    password,
  });
};

export const signOut = async (): Promise<void> => {
  await axios.post('/api/users/logout');
};
