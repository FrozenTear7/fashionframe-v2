import axios from 'axios';

export const signIn = async (): Promise<void> => {
  await axios.post('/api/users/login');
};

export const signOut = async (): Promise<void> => {
  await axios.post('/api/users/logout');
};
