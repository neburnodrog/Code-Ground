import React, { useState, FormEvent, FocusEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import './forms.css';
import { signup } from '../../services/auth';
import {
  Label,
  Input,
  Form,
  FormContainer,
  Button,
  Small,
  InputGroup,
  SmallContainer,
} from '../StyledComponents/FormComponents';

const emailRegexp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
const passwordRegexp = new RegExp(
  /(?=.*[0-9])(?=.*[|<>!@%+'!#$^?:.(){}[\]+~\-_.])[a-zA-Z0-9|<>!@%+'!#$^?:.(){}[\]+~\-_.]{8,30}/,
);

interface Errors {
  [key: string]: boolean;
}

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const currentErrors = { ...errors };

    if (username.length === 0 || username.length > 20) {
      currentErrors.username = true;
    } else currentErrors.username = false;

    if (password.length < 8 || !passwordRegexp.test(password)) {
      currentErrors.password = true;
    } else currentErrors.password = false;

    if (
      password.length === 0 ||
      !passwordRegexp.test(password) ||
      password2 !== password
    ) {
      currentErrors.password2 = true;
    } else currentErrors.password2 = false;

    if (!emailRegexp.test(email)) {
      currentErrors.email = true;
    } else currentErrors.email = false;

    return currentErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentErrors = validate();

    setErrors(currentErrors);

    if (Object.keys(errors).length !== 0) {
      signup(username, email, password)
        .then((resp) => {
          console.log(resp);
          <Redirect to="/login" />;
        })
        .catch((err) => {
          console.log('error catched in sigupform.tsx line 69', err);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'password2') setPassword2(value);
    if (name === 'email') setEmail(value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const isValid = validate()[name];
    setErrors({ ...errors, [name]: isValid });
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
            onBlur={handleBlur}
            onChange={handleChange}
            value={username}
            error={errors.username}
          />

          <SmallContainer displayInfo={errors.username}>
            <Small>Required. No longer than 20.</Small>
          </SmallContainer>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={email}
            error={errors.email}
          />

          <SmallContainer displayInfo={errors.email}>
            <Small>Provide valid email</Small>
          </SmallContainer>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={password}
            error={errors.password}
          />

          <SmallContainer displayInfo={errors.password}>
            <Small>Must have min 8 chars, 1 number & 1 special char</Small>
          </SmallContainer>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password2">Enter Password again:</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            onBlur={handleBlur}
            onChange={handleChange}
            value={password2}
            error={errors.password2}
          />

          <SmallContainer displayInfo={errors.password2}>
            <Small>Passwords must match with each other.</Small>
          </SmallContainer>
        </InputGroup>

        <Button type="submit">Join</Button>
      </Form>
    </FormContainer>
  );
}
