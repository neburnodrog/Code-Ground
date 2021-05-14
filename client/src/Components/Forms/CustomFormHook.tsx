import { useState, FormEvent, FocusEvent, ChangeEvent } from 'react';
import { UseFormProps } from './LoginForm';

export const useForm = ({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps) => {
  const [values, setValues] = useState(initialValues || {});
  const [touchedValues, setTouchedValues] = useState({
    username: false,
    password: false,
    password2: false,
    email: false,
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const name = target.name;

    setTouchedValues({ ...touchedValues, [name]: true });

    const errors = validate(values);
    setErrors(errors);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validate(values);
    setErrors({ ...errors, ...error });

    onSubmit(values, errors);
  };

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};
