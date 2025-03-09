"use client";
// import { Image } from "@nextui-org/image";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import NextImage from "next/image";
// import { Progress } from "@nextui-org/progress";
import clsx from "clsx";
import InputField from "../UI/Input";
import ImagePicker from "../UI/ImagePicker";
import FormImagePicker from "../FormImagePicker";
// import ImagePicker from "@/components/Form/ImagePicker";
// import FormImagePicker from "@/components/Form/FormImagePicker";
// import { Input } from "@/components/Form";
// import { getImageName } from "@/utils/miscHelper";
// import FormVideoPicker from "@/components/Form/FormVideoPicker";
// import VideoPicker from "@/components/Form/VideoPicker";

const progressBaseClass = "bg-[#D9D9D9]";

const StepThree = () => {
  const { control, watch, setValue } = useFormContext();

  const { fields: extrasField } = useFieldArray<any, any, any>({
    control,
    name: "filmExtras",
  });
  const posters = watch("posterUrls");
  const galleries = watch("gallery");
  const removePoster = (index: number) => {
    const updated = posters?.filter(
      (_: string, posterIndex: number) => index !== posterIndex
    );

    setValue("posterUrls", updated);
  };
  const removeGallery = (index: number) => {
    const updated = galleries?.filter(
      (_: string, galleryIndex: number) => index !== galleryIndex
    );

    setValue("gallery", updated);
  };
  const movieName = watch("name");
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Mother's Maiden Name"
          name="mothersMaidenName"
          type="text"
          labelClassName="text-[12px] font-bold capitalize pb-2"
          error={methods.formState.errors.mothersMaidenName?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
        />
      </div>

      <div>
        <InputField
          label="Father's Fullname"
          name="fathersFullName"
          type="text"
          labelClassName="text-[12px] font-bold capitalize pb-2"
          error={methods.formState.errors.fathersFirstName?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
        />
      </div>
      <div>
        <FormImagePicker
          // height="1280"
          // width="720"
          name="driverLicenseBp"
          render={(
            isLoading,
            isUploaded,
            isSelected,
            handleImageChange,
            imageDetails,
            imageValue,
            renderLoader,
            error,
            imgStatus,
            isMultiple,
            className,
            setValue,
            name
          ) => (
            <div className="mb-3">
              <p className="text-xs text-[#AAAAAA] md:text-sm">
                Upload Picture
              </p>
              <ImagePicker
                className="space-y-3"
                id="driverLicenseBp"
                imageDetails={imageDetails}
                imageValue={imageValue}
                isLoading={isLoading}
                isSelected={isSelected}
                isUploaded={isUploaded}
                name={name}
                renderLoader={renderLoader}
                setValue={setValue}
                showBtn={true}
                onImageChange={handleImageChange}
              />
            </div>
          )}
        />
      </div>

      {/* <div>
        <InputField
          label="Address"
          name="address"
          type="text"
          labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.address?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
        />
      </div> */}
    </div>
  );
};

export default StepThree;
