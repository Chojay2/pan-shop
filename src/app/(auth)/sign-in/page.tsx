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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div
        className="hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.png')" }}
      >
        <div className="flex flex-col h-full space-y-0">
          <div className="bg-white h-[128px] py-[32px] pl-[64px]">
            <text className="text-center text-[#EC1C24] text-4xl font-bold mt-[40px] mb-[40px]">
              Selise Pan Dokan
            </text>
          </div>

          <section className="grid grid-cols-4 grid-rows-2 mb-[80px]">
            {[
              '#FDDFD9',
              '#FFFFFF',
              '#F5BBAA',
              '#FDDFD9',
              '#FFFFFF',
              '#FDDFD9',
              '#FF6F61',
              '#FCF1E8',
            ].map((color, index) => (
              <div
                key={`${index}-${color}`}
                className={`bg-[${color}] h-[189px]`}
              ></div>
            ))}
          </section>

          <section className="text-left mb-[40px] pt-[32px] pl-[64px] space-y-8">
            <h2 className="text-xl text-white font-semibold m">Our Mission</h2>
            <p className="text-md text-white max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc at cursus pellentesque, nisl eros pellentesque quam,
              a faucibus nisl nunc id nisl.
            </p>
            <div className="flex justify-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[12px] h-[12px] rounded-full bg-white opacity-50 mx-[8px]"
                ></div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full px-[32px] lg:px-0 max-w-lg">
          <h2 className="text-start text-xl font-bold mb-[16px]">Login</h2>
          <Formik
            initialValues={iniatialValues}
            onSubmit={(values) => signInUser(values)}
          >
            {(props) => (
              <Form className="bg-white rounded pt-[24px] pb-[32px] mb-[16px]">
                <div className="mb-[16px]">
                  <PdInput
                    label="USER NAME"
                    type="text"
                    placeholder="Username"
                    name="email"
                  />
                </div>
                <div className="mb-[24px]">
                  <PdInput
                    label="PASSWORD"
                    type="password"
                    name="password"
                    placeholder="******************"
                  />
                  <p className="text-xs text-gray-500 mt-[8px]">
                    Forgot Password?{' '}
                    <span className="text-[#FF503F]">Click Here</span>
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between w-full">
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-[8px] px-[16px] mb-[16px] rounded-full focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <p className="text-xs text-gray-500 mt-[8px]">
                    Don`t have a account?{' '}
                    <span className="text-[#FF503F]">Sign Up</span>
                  </p>
                </div>
                {isSeller && (
                  <div>
                    logged in
                    <button onClick={() => logOut()}>log out</button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
