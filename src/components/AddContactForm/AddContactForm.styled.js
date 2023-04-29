import { ErrorMessage, Form } from 'formik';
import styled from '@emotion/styled';
import React from 'react';
import { TextField } from '@mui/material';

export const FormStyle = styled(Form)`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const Title = styled.h2`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 30%;
  margin: 0 auto;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 80%;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: bold;
`;

export const CustomInput = ({ field, ...props }) => (
  <TextField {...field} {...props} />
);

export const Error = styled(ErrorMessage)`
  color: red;
  font-size: 1rem;
  margin-top: 0.5rem;
`;
