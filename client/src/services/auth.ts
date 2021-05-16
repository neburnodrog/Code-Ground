import axios, { AxiosResponse } from 'axios';
import { UserDocument } from '../../../src/models/User';

interface Message {
  message: string;
}

interface LoginResponse extends AxiosResponse<UserDocument | Message> {}

export const signup = (username: string, email: string, password: string) => {
  return axios
    .post('/api/auth/signup', { username, email, password })
    .then((response: LoginResponse) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const login = (username: string, password: string) => {
  return axios
    .post('/api/auth/login', { username, password })
    .then((response: LoginResponse) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
