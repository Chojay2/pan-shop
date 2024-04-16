// import { useField } from 'formik';
// import React from 'react';

// interface PdRadioButtonProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   isDefaultChecked?: string;
//   options?: { value: string; label: string }[];
// }

// const PdRadioButton: React.FC<PdRadioButtonProps> = (
//   props: PdRadioButtonProps,
// ) => {
//   const [field] = useField(props);
//   if (props.options?.length) {
//     return (
//       <div className="flex flex-row">
//         {props.options.map((option) => (
//           <div
//             key={option.label}
//             className="flex items-center ml-[16px]"
//           >
//             <input
//               id={`${props.id}-${option.value}`}
//               type="radio"
//               className="w-4 h-4 text-red-600 form-radio"
//               defaultChecked={props.isDefaultChecked === option.value}
//               {...props}
//               {...field}
//             />
//             <label
//               htmlFor={`${props.id}-${option.value}`}
//               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//             >
//               {option.label}
//             </label>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center">
//       <input
//         type="radio"
//         className="w-4 h-4 text-red-600 form-radio"
//         defaultChecked={props.isDefaultChecked === props.label}
//         {...props}
//         {...field}
//       />
//       <label
//         htmlFor={props.id}
//         className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//       >
//         {props.label}
//       </label>
//     </div>
//   );
// };

// export default PdRadioButton;

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
              className="w-4 h-4 text-red-600 form-radio"
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
