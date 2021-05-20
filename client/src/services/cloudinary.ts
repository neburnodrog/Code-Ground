import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8000/api/cloudinary',
  withCredentials: true,
});

const errorHandler = (err: Error) => {
  throw err;
};

const Cloudinary = {
  service,
  uploadPic(pic: FormData, userId: string): Promise<string> {
    return service
      .post(`/new-pic/${userId}`, pic)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default Cloudinary;
