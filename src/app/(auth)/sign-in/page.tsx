'use client';
import UserApiService from '@/api/user.api';
import TextField from '@/components/text-field';
import useUsersAuthority from '@/hooks/use-users-authority';
import { logOutUser, setUser } from '@/state/auth/auth.slice';
import { RootState } from '@/state/store';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

function SingIn() {
  const iniatialValues = {
    email: '',
    password: '',
  };

  const { isSeller } = useUsersAuthority();

  const signInUser = async (values) => {
    try {
      toast.loading('Signing in...', { id: 'loading' });
      const userCredentials = await UserApiService.signInUser(values);

      toast.dismiss('loading');
      toast.success('Signed In successfully');
    } catch (error) {
      toast.dismiss('loading');
      toast.error('Signed In failed: ' + error.message);
      console.error('Signed In error:', error);
    }
  };

  const logOut = () => {
    try {
      UserApiService.signOutUser();
      toast.success('logged out successfully');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Formik
        initialValues={iniatialValues}
        onSubmit={(values) => signInUser(values)}
      >
        {(props) => (
          <Form>
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="loremipsum@gmail.com"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="qwert@123"
            />
            <button type="submit">Log in</button>
          </Form>
        )}
      </Formik>
      {isSeller && (
        <div>
          logged in
          <button onClick={() => logOut()}>log out</button>
        </div>
      )}
    </div>
  );
}

export default SingIn;
