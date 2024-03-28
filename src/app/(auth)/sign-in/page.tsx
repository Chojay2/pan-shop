'use client';
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';
import { RootState } from '@/state/store';
import UserApiService from '@/api/user.api';
import { logOutUser, setUser } from '@/state/auth/auth.slice';
import useUsersAuthority from '@/hooks/use-users-authority';
import { PdInput } from '@/components/ui-kit/input';
import { PdInputWithLabel } from '@/components/ui-kit/input-with-label';

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
    <div className="grid grid-cols-2 h-screen">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.png')" }}
      >
        <div className="flex flex-col h-full">
          <div className="bg-red-50">

          <text className="text-center text-4xl font-bold mt-10 mb-10">
            Selise Pan Dokan
          </text>
          </div>

          <section className="grid grid-cols-4 grid-rows-2 mb-20">
            <div className="bg-red-100 h-40"></div>
            <div className="bg-red-200 h-40"></div>
            <div className="bg-red-300 h-40"></div>
            <div className="bg-red-400 h-40"></div>
            <div className="bg-red-500 h-40"></div>
            <div className="bg-red-600 h-40"></div>
            <div className="bg-red-700 h-40"></div>
            <div className="bg-red-800 h-40"></div>
          </section>

          <section className="text-left mb-10 align-top ">
            <h2 className="text-2xl font-semibold m">Our Mission</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc at cursus pellentesque, nisl eros pellentesque quam,
              a faucibus nisl nunc id nisl.
            </p>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <Formik
            initialValues={iniatialValues}
            onSubmit={(values) => signInUser(values)}
          >
            {(props) => (
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <PdInputWithLabel
                    label="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-6">
                  <PdInputWithLabel
                    label="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign In
                  </button>
                </div>
                {/* {isSeller && (
              <div>
                logged in
                <button onClick={() => logOut()}>log out</button>
              </div>
            )} */}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
