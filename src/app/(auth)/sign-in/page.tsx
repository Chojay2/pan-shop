'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { toast } from 'sonner';
import UserService from '@/services/user.service';
import { setUser } from '@/state/auth/auth.slice';
import useUsersAuthority from '@/hooks/use-users-authority';
import SignInForm from '@/components/auth/sign-in/sign-in-form';

function SingIn() {
  const initialValues = {
    email: '',
    password: '',
  };

  const { isSeller } = useUsersAuthority();
  const dispatch = useDispatch();

  const signInUser = (values) => {
    toast.loading('Signing in...', { id: 'loading' });

    return UserService.signInUser(values)
      .then((userCredentials) => {
        // dispatch(setUser(userCredentials.user.uid));
        toast.dismiss('loading');
        toast.success('Signed In successfully');
      })
      .catch((error) => {
        toast.dismiss('loading');
        toast.error('Signed In failed: ' + error.message);
        console.error('Signed In error:', error);
      });
  };

  const logOut = () => {
    try {
      UserService.signOutUser();
      toast.success('logged out successfully');
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden lg:block bg-cover bg-gradient-to-b from-bgGradientStart to-bgGradientEnd bg-center">
        <div className="flex flex-col h-full space-y-0">
          <div className="bg-white h-[128px] py-[32px] pl-[64px]">
            <text className="text-center text-primary-500 text-[36px] font-bold mt-[40px] mb-[40px]">
              Selise Pan Dokan
            </text>
          </div>

          <section className="grid grid-cols-4 grid-rows-2 mb-[80px]">
            <div className="bg-lightPink h-[189px]"></div>
            <div className="bg-white h-[189px]"></div>
            <div className="bg-lightRed h-[189px]"></div>
            <div className="bg-lightPink h-[189px]"></div>
            <div className="bg-white h-[189px]"></div>
            <div className="bg-lightPink h-[189px]"></div>
            <div className="bg-orange h-[189px]"></div>
            <div className="bg-lightYellow h-[189px]"></div>
          </section>

          <section className="mb-[40px] pt-[32px] pl-[64px] space-y-[32px]">
            <h2 className="text-[20px] text-white font-semibold">
              Our Mission
            </h2>
            <p className="text-white max-w-[448px]">
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
        <div className="w-full px-[32px] lg:px-0 max-w-[512px]">
          <h2 className="text-start text-[20px] font-bold mb-[16px]">Login</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => signInUser(values)}
          >
            {(props) => <SignInForm />}
          </Formik>
          <button onClick={() => logOut()}>logout</button>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
