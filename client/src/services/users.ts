import axios from 'axios';
import { UserDocument } from '../../../src/models/User';

export const getUser = (id: string): Promise<UserDocument | null> => {
  return axios
    .get(`/api/users/${id}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err: Error) => console.log(err));
};

export const fetchUserFavourites = (userId: string) => {
  return axios
    .get(`/api/users/${userId}/favourites/`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addToFavourites = (userId: string, codeGroundId: string) => {
  return axios
    .get(`/api/users/${userId}/favourites/${codeGroundId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const removeFromFavourites = (userId: string, codeGroundId: string) => {
  return axios
    .delete(`/api/users/${userId}/favourites/${codeGroundId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
