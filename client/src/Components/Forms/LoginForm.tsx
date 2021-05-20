import React, {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { Redirect } from 'react-router-dom';
import { UserDocument } from '../../../../src/models/User';
import './forms.css';
import { login } from '../../services/auth';
import {
  Label,
  Input,
  Form,
  FormContainer,
  Button,
  InputGroup,
  Small,
} from '../StyledComponents/FormComponents';

interface LoginFormProps {
  setUser: Dispatch<SetStateAction<UserDocument | null>>;
  notSavedCodeGround: boolean;
}

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(username, password)
      .then((resp) => {
        if (resp.hasOwnProperty('message')) {
          setErrorMessage(resp.message);
        } else {
          console.log(resp);
          props.setUser(resp);
          props.notSavedCodeGround ? (
            <Redirect to="/code-grounds" />
          ) : (
            <Redirect to="/profile" />
          );
        }
      })
      .catch((err) => {
        console.log('Error logged in in LoginForm.tsx line 29', err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
            required
          />
        </InputGroup>

        {errorMessage ? <Small>{errorMessage}</Small> : <Small></Small>}

        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
}
