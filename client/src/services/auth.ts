import axios, { AxiosResponse } from 'axios';
import { UserDocument } from '../../../src/models/User';

interface Message {
  message: string;
}

interface LoginResponse extends AxiosResponse<UserDocument | Message> {}

export const signup = (username: string, email: string, password: string) => {
  return axios
    .post('/api/auth/signup', { username, email, password })
    .then((resp: LoginResponse) => resp.data)
    .catch((err) => err);
};

export const login = (username: string, password: string) => {
  console.log('login handler service');
  return axios
    .post('/api/auth/login', { username, password })
    .then((resp: LoginResponse) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then((resp) => resp.data)
    .catch((err) => err);
};
