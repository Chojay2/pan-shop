import React from 'react';
import { Form } from 'formik';
import PdButton from '@/components/ui-kit/button';
import { PdInput } from '@/components/ui-kit/input';
import PdRadioButton from '@/components/ui-kit/radio-button';
import { department } from '@/model/user.model';

const purposeOptions = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Seller',
    value: 'seller',
  },
  {
    label: 'Buyer',
    value: 'buyer',
  },
];

const departmentOptions = Object.keys(department).map((key) => ({
  label: key,
  value: key,
}));

const SignUpForm: React.FC = () => {
  return (
    <Form className="bg-white rounded pt-[24px] pb-[32px] mb-[16px] space-y-4">
      <div className="mb-[16px]">
        <PdInput
          label="Name"
          type="text"
          placeholder="Your Name"
          name="name"
        />
      </div>
      <div className="mb-[16px]">
        <PdInput
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-[16px]">
        <PdInput
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      <div className="mb-[16px]">
        <PdInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="mb-[16px]">
          <label className="block text-sm font-medium text-gray-700 mb-[16px]">
            What role will you be playing in our platform?
          </label>
          <div className="flex flex-row items-center space-x-4">
            <PdRadioButton
              id="purpose"
              name="purpose"
              label="purpose"
              isMultiple={true}
              options={purposeOptions}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="mb-[16px]">
          <label className="block text-sm font-medium text-gray-700 mb-[16px]">
            Select your department
          </label>
          <div className="flex items-center space-x-4">
            <PdRadioButton
              id="department"
              name="department"
              label="department"
              isMultiple={true}
              options={departmentOptions}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        <PdButton>Register</PdButton>
      </div>
    </Form>
  );
};

export default SignUpForm;
