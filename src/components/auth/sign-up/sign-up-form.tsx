import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import PdButton from '@/components/ui-kit/button';
import { PdInput } from '@/components/ui-kit/input';
import PdRadioButton from '@/components/ui-kit/radio-button';
import { department } from '@/model/user.model';
import * as Yup from 'yup';
import { toast } from 'sonner';
import UserApiService from '@/api/user.api';
import { useRouter } from 'next/navigation';

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
  department: Yup.string().required('please choose what you want to do!'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  department: '',
};

const SignUpForm: React.FC = () => {
  const router = useRouter();

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
      userValues.role = 'seller' && router.push('set-up-store');
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
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values) => registerUser(values)}
    >
      {(props) => (
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
                  name="role"
                  label="role"
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
            <PdButton type="submit">Register</PdButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
