import React, { useEffect } from 'react';
import './forms.css';
import { useForm } from './CustomFormHook';
import {
  Label,
  Input,
  Form,
  FormContainer,
  Button,
  Small,
} from '../StyledComponents/FormComponents';

const emailRegexp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
const passwordRegexp = new RegExp(
  /^(?=.*[0-9])(?=.*[|<>!@%+'!#$^?:.(){}[\]+~\-_.])[a-zA-Z0-9|<>!@%+'!#$^?:.(){}[\]+~\-_.]{8,30}$/,
);

export interface Values {
  username: string;
  password: string;
  password2: string;
  email: string;
}

export interface Errors<T> {
  [key: string]: T;
}

export default function LoginForm() {
  const initialValues = {
    username: '',
    password: '',
    password2: '',
    email: '',
  };

  const validate = (values: Values) => {
    const { username, password, password2, email } = values;
    const errors: Errors<boolean> = {};

    if (username.length === 0) {
      errors.username = true;
    } else errors.username = false;

    if (password.length < 8 || password || !passwordRegexp.test(password)) {
      errors.password = true;
    } else errors.password = false;

    if (password2 !== password) {
      errors.password2 = true;
    } else errors.password2 = false;

    if (!emailRegexp.test(email)) {
      errors.email = true;
    } else errors.email = false;

    return errors;
  };

  const onSubmit = (values: Values, errors: Errors<boolean>) => {
    alert(JSON.stringify({ values }));
  };

  const {
    values,
    errors,
    touchedValues,
    handleChange,
    handleSubmit,
    handleFocus,
    handleBlur,
  } = useForm({ initialValues, validate, onSubmit });

  useEffect(() => {
    console.log('useEffect hook callback');

    console.log('current State: ', values);
    console.log('currently touched values: ', touchedValues);
    console.log('current errors: ', errors);
  }, [touchedValues, values, errors]);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={values.username}
          error={errors.username}
          required
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          required
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={values.password}
          pattern="/^(?=.*[0-9])(?=.*[|<>!@%+'!#$^?:.(){}[\]+~\-_.])[a-zA-Z0-9|<>!@%+'!#$^?:.(){}[\]+~\-_.]{8,30}$/"
          error={errors.password}
        />
        <Small>Must have min 8 chars 1 number & 1 special char</Small>

        <Label htmlFor="password2">Enter Password again:</Label>
        <Input
          type="password"
          name="password2"
          id="password2"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          value={values.password2}
          error={errors.password2}
        />

        <Button type="submit" border={true} id="submit">
          Log In
        </Button>
      </Form>
    </FormContainer>
  );
}
