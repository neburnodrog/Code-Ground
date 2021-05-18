import React, { Dispatch, SetStateAction } from 'react';
import LoginForm from '../Components/Forms/LoginForm';
import { UserDocument } from '../../../src/models/User';

interface LoginProps {
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
  notSavedCodeGround: boolean;
}

export default function Login(props: LoginProps) {
  return <LoginForm {...props} />;
}
