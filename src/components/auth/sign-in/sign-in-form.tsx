import React from 'react';
import { Form } from 'formik';
import PdButton from '@/components/ui-kit/button';
import { PdInput } from '@/components/ui-kit/input';

const SignInForm: React.FC = () => {
  return (
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
          Forgot Password? <span className="text-primary-500">Click Here</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        <PdButton>Sign In</PdButton>
        <p className="text-xs text-gray-500 mt-[8px]">
          Don`t have an account?{' '}
          <span className="text-primary-500">Sign Up</span>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
