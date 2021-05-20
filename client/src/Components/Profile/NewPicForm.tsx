import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { UserDocument } from '../../../../src/models/User';
import { Label, Input, Form, Button } from '../StyledComponents/FormComponents';
import Cloudinary from '../../services/cloudinary';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface NewPicFormProps extends RouteComponentProps {
  user: UserDocument;
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
}

const NewPicForm: FC<NewPicFormProps> = ({ user, setUser, history }) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pic = new FormData();
    if (file) {
      pic.append('pic', file, file.name);

      Cloudinary.uploadPic(pic, user._id)
        .then((picPath) => {
          return axios
            .get('/api/auth/logged-in')
            .then((resp) => {
              const user: UserDocument = resp.data;
              setUser(user);
              history.push('/profile');
            })
            .catch((err) =>
              console.log('Error while retrieving the new user instance'),
            );
        })
        .catch((err) => {
          console.log('Error while adding the pic: ', err);
        });
    } else {
      return;
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/Form-data">
        <Label htmlFor="pic">Upload new profile pic:</Label>
        <Input
          type="file"
          name="pic"
          id="pic"
          onChange={handleFileChange}
          required
        />
        <Button type="submit">Upload Profile Pic</Button>
      </Form>
    </div>
  );
};

export default NewPicForm;
