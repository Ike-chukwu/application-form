"use client";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputField from "../UI/Input";
import SelectField from "../UI/Select";

// import FormImagePicker from "@/components/Form/FormImagePicker";
// // import FormSelect from "@/components/Form/FormSearchSelect";
// import ImagePicker from "@/components/Form/ImagePicker";
// import { AddIcon, DeleteIcon, EditIcon } from "@/components/icons";
// import WebModal from "@/components/UI/WebModal";
// import { changeArrayShape } from "@/helpers/common";
// import { useGetAllMovieRole, useGetAllPerson } from "@/hooks";
// import { FormField, FormSearchSelect } from "@/components/Form";
// import { defaultInputClass, defaultLabelClass } from "@/constants";

const StepTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const { control, watch } = useFormContext();
  // const { persons } = useGetAllPerson();
  // const { movieRoles } = useGetAllMovieRole();

  const {
    fields: castFields,
    append,
    remove,
    update,
  } = useFieldArray<any, any, any>({
    control,
    name: "casts",
  });
  const casts = watch("casts");

  const handleAddCast = useCallback(() => {
    append({
      personId: "",
      movieRoleId: "",
      pictureUrl: "",
      name: "",
      serialNumber: 0,
    });
    setAdd(true);
    setIsOpen(true);
    setIsEdit(false);
  }, [append]);

  const addCast = useCallback(
    (castId: number) => {
      update(castId, {
        personId: casts[castId]?.personId,
        movieRoleId: casts[castId]?.movieRoleId,
        pictureUrl: casts[castId]?.pictureUrl,
        name: casts[castId]?.name,
        serialNumber: casts[castId]?.serialNumber,
      });
      setIsOpen(false);
      setIsEdit(false);
    },

    [casts, update]
  );

  const deleteCast = useCallback(
    (castId: number | undefined) => {
      remove(castId);
    },
    [remove]
  );

  const editCast = useCallback((castId: number) => {
    setAdd(false);
    setIsEdit(true);
    setIsOpen(true);
    setId(castId);
  }, []);

  const handleSave = useCallback(() => {
    const castIndex = !isEdit ? castFields.length - 1 : id;

    if (typeof castIndex === "number") {
      addCast(castIndex);
    } else {
      console.error("Invalid cast index");
    }
  }, [addCast, isEdit, castFields.length, id]);

  const handleModalClose = () => {
    if (add && !castFields[castFields?.length - 1]?.personId) {
      deleteCast(castFields?.length - 1);
    }

    setTimeout(() => setIsOpen(false), 1000);
  };
  const methods = useFormContext();
  const idTypeValue = methods.watch("idType");
  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Mobile Number"
          name="mobileNo"
          type="text"
          labelClassName="text-[12px] font-bold capitalize pb-2"
          error={methods.formState.errors.mobileNo?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
        />
      </div>
      <div>
        <SelectField
          error={methods.formState.errors.idType?.message as string}
          options={[
            { id: 0, name: "Drivers License" },
            { id: 1, name: "Passport" },
          ]}
          name="idType"
          label="ID Type"
          labelClassName="text-[11px]  font-bold capitalize"
          selectClassName="px-2 text-[10px] outline-none py-4 border-[0.1px] border-grey w-full"
        />
      </div>
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Drivers License Number"
            name="driverLicenseNumber"
            type="text"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={
              methods.formState.errors.driverLicenseNumber?.message as string
            }
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
          />
        </div>
      )}
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Expiry Date"
            name="expiryDate"
            type="text"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={methods.formState.errors.expiryDate?.message as string}
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
          />
        </div>
      )}
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Issue Date"
            name="issueDate"
            type="text"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={methods.formState.errors.issueDate?.message as string}
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
          />
        </div>
      )}
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

export default StepTwo;
