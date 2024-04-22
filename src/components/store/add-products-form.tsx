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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name:
          </label>
          <PdInput
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Product Description:
          </label>
          <PdInput
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price:
          </label>
          <PdInput
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Product Category:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PdButton
                type="button"
                className="mt-1 block w-full p-2 bg-gray-300 border border-gray-300 rounded-md"
              >
                {productCategory || 'Select Category'}
              </PdButton>
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
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload your product images
          </label>
          <DropZone />
        </div>
        <PdButton
          type="submit"
          className="text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </PdButton>
      </form>
    </div>
  );
};

export default AddProductPage;
