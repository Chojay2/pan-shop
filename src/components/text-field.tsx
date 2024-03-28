import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-[12px] flex flex-col">
      {label ? <label htmlFor={field.name}>{label}</label> : <></>}
      <input
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error"
      />
    </div>
  );
};

export default TextField;
