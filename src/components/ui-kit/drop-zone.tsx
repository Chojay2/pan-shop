import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { FormikErrors } from 'formik';

interface IUploadFile<T> {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<T>>;
  errors: FormikErrors<T>;
  inputName: string;
}

const DropZone: FunctionComponent<IUploadFile<{ image?: File }>> = ({
  data,
  setFieldValue,
  errors,
  inputName,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      console.log(file);
      setFieldValue(inputName, file);
      setFileName(file.name);
      setIsDisabled(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
      <Image
        src="/images/file-upload-icon.svg"
        alt="upload"
        height={50}
        width={50}
        className="mb-4"
      />
      <input
        id="fileSelect"
        type="file"
        name={inputName}
        multiple
        className="hidden"
        onChange={handleFileChange}
        disabled={isDisabled}
      />
      <label
        htmlFor="fileSelect"
        className="cursor-pointer text-[#FF503F]"
      >
        {fileName ? `Uploaded: ${fileName}` : 'You can select multiple Files'}
      </label>
      {!fileName && (
        <h3 className="text-gray-500">or drag &amp; drop your files here</h3>
      )}
      {errors.image && <span id="error">{errors.image}</span>}
    </div>
  );
};

export default DropZone;
