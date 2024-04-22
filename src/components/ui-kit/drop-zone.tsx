import React from 'react';
import Image from 'next/image';

const DropZone = () => {
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
