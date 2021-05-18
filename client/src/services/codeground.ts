import axios, { AxiosResponse } from 'axios';
import {
  CodeGroundPopulated,
  CodeGroundDocument,
} from '../../../src/models/CodeGround';
// import { UserDocument } from '../../../src/models/User';

interface fetchAllResponse extends AxiosResponse<CodeGroundPopulated[]> {}
interface Response extends AxiosResponse<CodeGroundDocument | Error> {}

export const fetchOne = (id: string): Promise<CodeGroundDocument> => {
  return axios
    .get(`/api/code-ground/${id}`)
    .then((resp: Response) => resp.data)
    .catch((err) => err);
};

export const fetchAll = (): Promise<CodeGroundPopulated[]> => {
  return axios
    .get('/api/code-ground/')
    .then((resp: fetchAllResponse) => resp.data)
    .catch((err) => err);
};

export const createCodeGround = (
  title: string,
  html: string,
  css: string,
  js: string,
  user: string,
  creator: string,
): Promise<CodeGroundDocument> => {
  const forked = user !== creator ? true : false;

  return axios
    .post('/api/code-ground/', { title, html, css, js, user, creator, forked })
    .then((resp: Response) => resp.data)
    .catch((err) => err);
};

export const updateCodeGround = (
  title: string,
  html: string,
  css: string,
  js: string,
  id: string,
): Promise<CodeGroundDocument> => {
  console.log('updateCodeGround function');
  return axios
    .put(`/api/code-ground/${id}`, {
      title,
      html,
      css,
      js,
    })
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
};
