"use client";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputField from "../UI/Input";

const StepOne = () => {

  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Full Name"
          name="fullname"
          type="text"
          labelClassName="text-xs font-bold capitalize pb-2"
          error={methods.formState.errors.fullname?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          labelClassName="text-xs font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.dob?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Social Security Number"
          name="ssn"
          type="text"
          labelClassName="text-xs font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.ssn?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Address"
          name="address"
          type="text"
          labelClassName="text-xs font-bold capitalize pt-6 pb-2"
          error={methods.formState.errors.address?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
    </div>
  );
};

export default StepOne;
