import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Error,
  FormField,
  FormStyle,
  CustomInput,
  Title,
} from './AddContactForm.styled';
import { Button } from '@mui/material';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Invalid phone number'),
});

const AddContactForm = ({ onSubmit, initialValues }) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        <FormStyle>
          <Title> Add a contact</Title>
          <FormField>
            <Field name="name">
              {({ field }) => <CustomInput {...field} label="Name" id="name" />}
            </Field>
            <Error name="name" component="div" />
          </FormField>
          <FormField>
            <Field name="number">
              {({ field }) => (
                <CustomInput {...field} label="Phone number" id="phoneNumber" />
              )}
            </Field>
            <Error name="phoneNumber" component="div" />
          </FormField>
          <Button variant="contained" type="submit" size="large">
            Add contact
          </Button>
        </FormStyle>
      </Formik>
    </>
  );
};

export default AddContactForm;
