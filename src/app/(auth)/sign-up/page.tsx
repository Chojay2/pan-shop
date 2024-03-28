'use client';

import React from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';
import UserApiService from '@/api/user.api';
import PdInput from '@/components/ui-kit/input';
import { department } from '@/model/user.model';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function SingUp() {
  const validate = Yup.object({
    name: Yup.string().required('Name Required!'),
    email: Yup.string().email('Email is invalid!').required('Email Required!'),
    password: Yup.string()
      .min(6, 'Password must be minimum 4 digits!')
      .required('Password Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Password must match!')
      .required('Confirm password is reqired!'),
    role: Yup.string()
      .oneOf(['admin', 'seller', 'buyer'])
      .required('please choose what you want to do!'),
    department: Yup.string()
      .oneOf(Object.values(department))
      .required('please choose what you want to do!'),
  });

  const departmentValues = Object.values(department);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
  };
  const registerUser = async (values: any) => {
    toast.loading('Submitting...', { id: 'loading' });
    const { password, confirmPassword, ...userValues } = values;

    try {
      const userCredentials = await UserApiService.createUser(values);

      UserApiService.addUser({
        uid: userCredentials.user.uid,
        ...userValues,
      });

      toast.dismiss('loading');

      toast.success('User added successfully');
    } catch (error: any) {
      toast.dismiss('loading');
      if (error.code === 'auth/email-already-in-use') {
        toast.error(
          'Email address is already in use. Please use a different email.',
        );
      } else {
        toast.error('User registration failed: ' + error.message);
        console.error('User registration error:', error);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => registerUser(values)}
      >
        {(formik) => (
          <div>
            <h1 className="">Signup</h1>
            <Form className="form p-3">
              <PdInput
                type="text"
                label="name"
                name="name"
                placeholder="Lorem"
              />
              <PdInput
                type="email"
                name="email"
                label="Email"
                placeholder="loremipsum@gmail.com"
              />
              <PdInput
                type="password"
                name="password"
                label="Password"
                placeholder="qwert@123"
              />
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className={`form-control shadow-none ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    'is-invalid'
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password..."
                  {...formik.getFieldProps('confirmPassword')}
                />
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                />
              </div>

              <div id="role-radio-group">What is your purpose here?</div>
              <div
                role="group"
                aria-labelledby="role-radio-group"
              >
                {['admin', 'seller', 'buyer'].map((value) => (
                  <label key={value}>
                    <Field
                      type="radio"
                      name="role"
                      value={value}
                    />
                    {value}
                  </label>
                ))}
              </div>
              <div id="department-radio-group">What is your department?</div>
              <div
                role="group"
                aria-labelledby="department-radio-group"
              >
                {departmentValues.map((value) => (
                  <label key={value}>
                    <Field
                      type="radio"
                      name="department"
                      value={value}
                    />
                    {value}
                  </label>
                ))}
              </div>
              <button type="submit">Register</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SingUp;
