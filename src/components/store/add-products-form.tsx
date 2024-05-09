import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui-kit/dropdown-menu';
import { PdInput } from '../ui-kit/input';
import PdButton from '../ui-kit/button';
import DropZone from '../ui-kit/drop-zone';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');

  return (
    <div className="max-w-full md:max-w-[50%] mx-auto p-[16px]">
      <h1 className="text-[24px] font-bold mb-[16px]">Add a New Product</h1>
      <form className="space-y-[16px]">
        <div>
          <label
            htmlFor="productName"
            className="block text-[14px] font-medium text-gray-700"
          >
            Product Name:
          </label>
          <PdInput
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-[4px] block w-full p-[8px] border border-gray-300 rounded-[6px]"
          />
        </div>
        <div>
          <label
            htmlFor="productDescription"
            className="block text-[14px] font-medium text-gray-700"
          >
            Product Description:
          </label>
          <PdInput
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="mt-[4px] block w-full p-[8px] border border-gray-300 rounded-[6px]"
          />
        </div>
        <div>
          <label
            htmlFor="productPrice"
            className="block text-[14px] font-medium text-gray-700"
          >
            Product Price:
          </label>
          <PdInput
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="mt-[4px] block w-full p-[8px] border border-gray-300 rounded-[6px]"
          />
        </div>
        <div>
          <label
            htmlFor="productCategory"
            className="block text-[14px] font-medium text-gray-700"
          >
            Product Category:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="mt-[4px] block w-full p-[8px] bg-gray-100 border border-gray-300 rounded-[6px] items-center">
                {productCategory || 'Select Category'}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={productCategory}
                onValueChange={setProductCategory}
              >
                <DropdownMenuRadioItem value="electronics">
                  Electronics
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="clothing">
                  Clothing
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="home">Home</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mb-[32px] space-y-[8px]">
          <label className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload your product images
          </label>
          <DropZone />
        </div>
        <div className="flex justify-center w-full">
          <PdButton
            type="submit"
            className="text-white font-bold py-[8px] px-[16px] rounded md:w-[30%]"
          >
            Add Product
          </PdButton>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
