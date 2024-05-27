'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PdButton from '@/components/ui-kit/button';
import { PdInput } from '@/components/ui-kit/input';
import { PdTextarea } from '@/components/ui-kit/text-area';
import DropZone from '@/components/ui-kit/drop-zone';
import { uploadImage } from '@/services/api.service';
import StoreService from '@/services/store.service';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import UserService from '@/services/user.service';

const initialValues = {
  shopName: '',
  description: '',
  image: {} as File,
};

const validationScheme = Yup.object({
  shopName: Yup.string().required('Store Name is required'),
  description: Yup.string().max(250),
  image: Yup.object(),
});

function SetUpStoreForm() {
  const uid = useSelector((state: RootState) => state.auth.user?.uid);
  const submitStoreInfo = async (values) => {
    const imageUrl = await uploadImage(values.image);

    const { image, ...restValues } = values;

    const storeInfo = {
      sellerUid: uid,
      ...restValues,
      img: imageUrl,
    };

    await StoreService.addNewStore(storeInfo);
  };
  return (
    <div className="container mx-auto px-[8px] pt-[64px]">
      <h1 className="text-[24px] font-bold mb-[32px]">About Your Shop</h1>
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="col-span-1">
          <h2 className="text-[16px] font-semibold">Shop Info</h2>
          <p className="text-[12px] text-gray-500">Provide your Shop Info</p>
        </div>

        <div className="col-span-1">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => submitStoreInfo(values)}
            validationSchema={validationScheme}
          >
            {(props) => (
              <Form>
                <div className="mb-[16px]">
                  <PdInput
                    label="Shop Name"
                    type="text"
                    placeholder="shop name"
                    name="shopName"
                  />
                </div>
                <div className="mb-[16px]">
                  <PdTextarea
                    label="Description"
                    placeholder="type your description here"
                    name="description"
                  />
                </div>
                <div className="mb-[16px] space-y-[16px]">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Upload your Shop Banner
                  </label>
                  <DropZone
                    data={props.values}
                    errors={props.errors}
                    setFieldValue={props.setFieldValue}
                    inputName="image"
                  />
                </div>
                <div className="flex justify-end">
                  <PdButton
                    className="w-[20%]"
                    type="submit"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    Submit
                  </PdButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <hr className="my-[16px]" />
    </div>
  );
}

export default SetUpStoreForm;
