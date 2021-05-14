import React from 'react';
import { useForm } from './CustomFormHook';
import styled from 'styled-components';

const passwordRegExp = new RegExp(
  /^(?=.*[0-9])(?=.*[|<>!@%+'!#$^?:.(){}[\]+~\-_.])[a-zA-Z0-9|<>!@%+'!#$^?:.(){}[\]+~\-_.]{8,30}$/,
);

const emailRegExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export interface Values {
  username: string;
  password: string;
  password2: string;
  email: string;
}

export interface Errors {
  username: string;
  password: string;
  password2: string;
  email: string;
}

export interface UseFormProps {
  initialValues: Values;
  onSubmit: (values: Values, errors: Errors) => void;
  validate: (values: Values) => Errors;
}

type InputProps = {
  touched: boolean;
};

const Input = styled.input<InputProps>`
  padding: 5px 20px;

  ${(props) =>
    props.touched
      ? 'border: 1px solid lightblue'
      : 'border: 1px solid transparent'}
`;

export default function LoginForm() {
  const initialValues = {
    username: '',
    password: '',
    password2: '',
    email: '',
  };

  const onSubmit = (values: Values, errors: Errors) => {
    alert(JSON.stringify({ values, errors }, null, 2));
  };

  const validate = (values: Values) => {
    const errors: Errors = {
      username: '',
      password: '',
      password2: '',
      email: '',
    };

    if (values.username === '') errors.username = 'Please enter a username';

    if (values.password.length < 8)
      errors.password = 'Password must be at least 8 characters long';

    if (passwordRegExp.test(values.password) === false) {
      errors.password =
        "Password must contain at least one number and one special character |<>!@%+'!#$^?:.(){}[]+~-_.)";
    }

    if (values.password2 !== values.password)
      errors.password2 = "Passwords doesn't match with each other";

    if (emailRegExp.test(values.email) === false)
      errors.email = 'Type in a valid e-mail';

    return errors;
  };

  const {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useForm({ initialValues, onSubmit, validate });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          name="username"
          id="username"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.username}
          touched={touchedValues.username}
        />
        {errors.username && <small>{errors.username}</small>}

        <label htmlFor="email">Email</label>
        <Input
          type="text"
          name="email"
          id="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          touched={touchedValues.email}
        />
        {errors.email && <small>{errors.email}</small>}

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          touched={touchedValues.password}
        />
        {errors.password && <small>{errors.password}</small>}

        <label htmlFor="password2">Password</label>
        <Input
          type="password"
          name="password2"
          id="password2"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password2}
          touched={touchedValues.password2}
        />
        {errors.password2 && <small>{errors.password2}</small>}

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
