import { useState } from 'react';
import { Form } from 'formik';
import PdButton from '@/components/ui-kit/button';
import { PdInput } from '@/components/ui-kit/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui-kit/dropdown-menu';

const SignUpForm: React.FC = () => {
  const [purpose, setPurpose] = useState('');

  const [department, setDepartment] = useState('');

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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[8px]">
            What role will you be playing in our platform?
          </label>
          <div className="flex flex-row items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PdButton
                  type="button"
                  className="mt-1 block w-full p-2 text-black text-sm hover:text-white font-normal bg-transparent border border-gray-300 rounded-md"
                >
                  {purpose || 'Select Purpose'}
                </PdButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={purpose}
                  onValueChange={setPurpose}
                >
                  <DropdownMenuRadioItem value="admin">
                    Admin
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="seller">
                    Seller
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="buyer">
                    Buyer
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-[8px]">
            Select your department
          </label>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PdButton
                  type="button"
                  className="mt-1 block w-full p-2 text-black hover:text-white text-sm font-normal bg-transparent border border-gray-500 rounded-md"
                >
                  {department || 'Select Department'}
                </PdButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={department}
                  onValueChange={setDepartment}
                >
                  <DropdownMenuRadioItem value="front-end">
                    Front-End
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="user-interface">
                    User Interface
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="back-end">
                    Back-End
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="quality-assurance">
                    Quality Assurance
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="business-analyst">
                    Business Analyst
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="admin-and-hr">
                    Admin And HR
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
