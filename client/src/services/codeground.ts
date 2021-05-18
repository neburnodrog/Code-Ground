import axios, { AxiosResponse } from 'axios';
import {
  CodeGroundPopulated,
  CodeGroundDocument,
} from '../../../src/models/CodeGround';
import { UserDocument } from '../../../src/models/User';

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

export const saveCodeGround = (
  title: string,
  html: string,
  css: string,
  js: string,
  _id: string,
): Promise<CodeGroundDocument> => {
  return axios
    .post('/api/code-ground/', { title, html, css, js, _id })
    .then((resp: Response) => resp.data)
    .catch((err) => err);
};
