import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui-kit/dropdown-menu';
import * as Yup from 'yup';
import { PdInput } from '../ui-kit/input';
import PdButton from '../ui-kit/button';
import DropZone from '../ui-kit/drop-zone';
import { Form, Formik } from 'formik';
import { uploadImage } from '@/services/api.service';
import StoreService from '@/services/store.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const AddProductPage = () => {
  const [productCategory, setProductCategory] = useState('');
  const uid = useSelector((state: RootState) => state.auth.user?.uid);

  const initialProductValues = {
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    image: {} as File,
  };

  const validationScheme = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    productDescription: Yup.string().max(250),
    productPrice: Yup.number().required('Product Price is required'),
    productCategory: Yup.string(),
    image: Yup.object(),
  });
  const submitProduct = async (values) => {
    const { image, ...restValues } = values;
    const imageUrl = await uploadImage(values.productImage);
    const productInfo = {
      uid: uid,
      ...restValues,
      productImage: imageUrl,
    };
    await StoreService.addProduct(productInfo);
  };

  return (
    <div className="max-w-full md:max-w-[50%] mx-auto p-[16px]">
      <h1 className="text-[24px] font-bold mb-[16px]">Add a New Product</h1>
      <Formik
        initialValues={initialProductValues}
        onSubmit={submitProduct}
        validationSchema={validationScheme}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form className="space-y-[16px]">
            <div>
              <label
                htmlFor="productName"
                className="block text-[14px] font-medium text-gray-700"
              >
                Product Name:
              </label>
              <PdInput
                type="text"
                name="productName"
                id="productName"
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
                name="productDescription"
                id="productDescription"
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
                name="productPrice"
                type="number"
                id="productPrice"
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
              <DropdownMenu
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    setFieldValue('productCategory', productCategory);
                  }
                }}
              >
                <DropdownMenuTrigger>
                  <div className="mt-[4px] block w-full p-[8px] bg-gray-100 border border-gray-300 rounded-[6px] items-center">
                    {values.productCategory || 'Select Category'}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={productCategory}
                    onValueChange={(value) => {
                      setProductCategory(value);
                      setFieldValue('productCategory', value);
                    }}
                  >
                    <DropdownMenuRadioItem value="electronics">
                      Electronics
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="clothing">
                      Clothing
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="home">
                      Home
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mb-[32px] space-y-[8px]">
              <label className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload your product images
              </label>
              <DropZone
                data={values}
                errors={errors}
                setFieldValue={setFieldValue}
                inputName="productImage"
              />
            </div>
            <div className="flex justify-center w-full">
              <PdButton
                type="submit"
                className="text-white font-bold py-[8px] px-[16px] rounded md:w-[30%]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Add Product'}
              </PdButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductPage;
