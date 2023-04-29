import React from 'react';
import { Field, Formik } from 'formik';
import {
  Error,
  FormField,
  FormStyle,
  CustomInput,
  Title,
} from 'components/AddContactForm/AddContactForm.styled';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userLogin } from 'redux/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(userLogin(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormStyle style={{ margin: 'auto', width: '35%' }}>
        <Title> Login</Title>
        <FormField>
          <Field name="email">
            {({ field }) => (
              <CustomInput {...field} label="Email" type="email" />
            )}
          </Field>
          <Error name="email" component="div" />
        </FormField>

        <FormField>
          <Field name="password">
            {({ field }) => (
              <CustomInput {...field} label="Password" type="password" />
            )}
          </Field>
          <Error name="password" component="div" />
        </FormField>
        <Button variant="contained" type="submit" size="large">
          Log in
        </Button>
      </FormStyle>
    </Formik>
  );
};

export default LoginForm;
