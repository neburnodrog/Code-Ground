import axios, { AxiosResponse } from 'axios';
import { error } from 'console';
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

export const deleteGround = (id: string): Promise<CodeGroundDocument> => {
  return axios
    .delete(`/api/code-ground/${id}`)
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

export const fetchUserGrounds = (
  userId: string,
): Promise<CodeGroundPopulated[]> => {
  return axios
    .get(`/api/code-ground/user/${userId}`)
    .then((resp: fetchAllResponse) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((err) => err);
};

export const likeCodeGround = (codeGroundId: string, userId: string) => {
  return axios
    .get(`/api/code-ground/${codeGroundId}/like/${userId}`)
    .then((resp: AxiosResponse) => console.log(resp.data))
    .catch((err) => err);
};

export const dislikeCodeGround = (codeGroundId: string, userId: string) => {
  return axios
    .delete(`/api/code-ground/${codeGroundId}/like/${userId}`)
    .then((resp: AxiosResponse) => console.log(resp.data))
    .catch((err) => err);
};

export const forkCodeGround = (
  codeGround: CodeGroundPopulated,
  userId: string,
) => {
  const { title, html, js, css, creator } = codeGround;

  return axios
    .post(`/api/code-ground/fork/${userId}`, { title, html, js, css, creator })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const commentCodeGround = (codeGroundId: string, userId: string) => {
  return axios
    .get(`/api/code-ground/${codeGroundId}/comments/${userId}`)
    .then((resp: AxiosResponse) => console.log(resp.data))
    .catch((err) => err);
};

export const uncommentCodeGround = (
  codeGroundId: string,
  commentId: string,
) => {
  return axios
    .delete(`/api/code-ground/${codeGroundId}/comments/${commentId}`)
    .then((resp: AxiosResponse) => console.log(resp.data))
    .catch((err) => err);
};
