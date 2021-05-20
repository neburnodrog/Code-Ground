import React, { Dispatch, FC, SetStateAction } from 'react';
import NewPicForm from './NewPicForm';
import { UserDocument } from '../../../../src/models/User';
import { RouteComponentProps } from 'react-router-dom';

export interface ProfileEditProps extends RouteComponentProps {
  user: UserDocument;
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
}

const ProfileEdit: FC<ProfileEditProps> = (props) => {
  const { user, setUser } = props;

  return (
    <div>
      <NewPicForm {...props} user={user} setUser={setUser} />
    </div>
  );
};

export default ProfileEdit;
