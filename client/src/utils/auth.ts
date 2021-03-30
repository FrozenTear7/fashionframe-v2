import axios from 'axios';

export const signUp = async (
  username: string,
  email: string,
  password: string,
  password2: string
): Promise<{ _id: string; username: string }> => {
  const registerRes = await axios.post('/api/users', {
    username,
    email,
    password,
    password2,
  });

  return {
    _id: registerRes.data._id,
    username: registerRes.data.username,
  };
};

export const signIn = async (
  username: string,
  password: string
): Promise<{ _id: string; username: string }> => {
  const loginRes = await axios.post('/api/users/login', {
    username,
    password,
  });

  return {
    _id: loginRes.data._id,
    username: loginRes.data.username,
  };
};

export const signOut = async (): Promise<void> => {
  await axios.post('/api/users/logout');
};
