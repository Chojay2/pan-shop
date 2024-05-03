import React from 'react';
import { Field } from 'formik';

interface PdRadioButtonProps {
  id: string;
  name: string;
  label: string;
  defaultChecked?: string;
  isMultiple?: boolean;
  options?: { value: string; label: string }[];
}

const PdRadioButton: React.FC<PdRadioButtonProps> = ({
  id,
  name,
  label,
  defaultChecked,
  isMultiple,
  options,
}) => {
  if (isMultiple && options) {
    return (
      <div className="flex flex-row">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center ml-[16px]"
          >
            <Field
              name={name}
              type="radio"
              value={option.value}
              id={`${id}-${option.value}`}
              className="w-[16px] h-[16px] text-red-600 form-radio"
            />

            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-[8px] text-[14px] font-medium text-gray-900 dark:text-gray-300"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        className="w-[16px] h-[16px] text-red-600 form-radio"
        defaultChecked={defaultChecked === label}
      />
      <label
        htmlFor={id}
        className="ml-[8px] text-[14px] font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default PdRadioButton;
