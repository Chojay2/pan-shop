import React from 'react';

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
            <input
              id={`${id}-${option.value}`}
              name={name}
              type="radio"
              className="w-4 h-4 text-red-600 form-radio"
              value={option.value}
              defaultChecked={defaultChecked === option.value}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
        className="w-4 h-4 text-red-600 form-radio"
        defaultChecked={defaultChecked === label}
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default PdRadioButton;
