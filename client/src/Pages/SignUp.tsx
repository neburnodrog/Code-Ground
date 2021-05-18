import React from 'react';
import SignUpForm from '../Components/Forms/SignUpForm';
import { RouteComponentProps } from 'react-router-dom';

export default function SignUp(props: RouteComponentProps) {
  return <SignUpForm {...props} />;
}
