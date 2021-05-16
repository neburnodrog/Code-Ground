import { useState, FormEvent, FocusEvent, ChangeEvent } from 'react';
import { Errors, Values } from './LoginForm';

export interface UseFormProps {
  initialValues: Values;
  onSubmit: (values: Values, errors: Errors<boolean>) => void;
  validate: (values: Values) => Errors<boolean>;
}

export const useForm = ({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors<boolean>>({});
  const [touchedValues, setTouchedValues] = useState({
    username: false,
    password: false,
    password2: false,
    email: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setValues({ ...values, [name]: value });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    console.log('handleFocus function');

    const target = e.currentTarget;
    const name = target.name;

    setTouchedValues({ ...touchedValues, [name]: true });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    console.log('handleBlur function');

    const target = e.currentTarget;
    const name: keyof Errors<boolean> = target.name;

    let isValid = validate(values)[name];

    setErrors({ ...errors, [name]: isValid });
    setTouchedValues({ ...touchedValues, [name]: false });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentErrors = validate(values);
    setErrors(currentErrors);

    onSubmit(values, errors);
  };

  return {
    values,
    errors,
    touchedValues,
    handleChange,
    handleSubmit,
    handleFocus,
    handleBlur,
  };
};
