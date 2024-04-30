import React from 'react';
import { TbFileUpload } from 'react-icons/tb';

const DropZone = () => {
  return (
    <div className="flex flex-col items-center justify-center p-[16px] rounded-[8px] border-[2px] border-dashed border-gray-300 text-center">
      <TbFileUpload size="64px" />
      <input
        id="fileSelect"
        type="file"
        multiple
        className="hidden"
      />
      <label
        htmlFor="fileSelect"
        className="cursor-pointer text-primary-400"
      >
        You can select multiple Files
      </label>
      <h3 className="text-gray-500">or drag &amp; drop your files here</h3>
    </div>
  );
};

export default DropZone;
