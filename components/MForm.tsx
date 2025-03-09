"use client";
// import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import clsx from "clsx";
import React, { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CheckIcon, RightArrow } from "./icons";
import { useRouterQuery } from "../hooks/useRouterQuery";
import StepOne from "./FormSteps/StepOne";
import StepTwo from "./FormSteps/StepTwo";
import StepThree from "./FormSteps/StepThree";
import { LoginSetupSteps } from "@/constants";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import StepFour from "./FormSteps/StepFour";
import { MultiStepPayload, multiStepSchema } from "@/app/services/login/schema";

type Prop = {
  onSave: (values: MultiStepPayload) => void;
  info?: any;
  isLoading: boolean;
};

const MForm: React.FC<Prop> = ({ onSave, info, isLoading }) => {
  const {
    stepIndex,
    formStep,
    push,
    back,
    next,
    changeQuery,
    // steps,
    isFirstStep,
    isLastStep,
    urlStep,
  } = useMultiStepForm(
    [
      <StepOne key={0} />,
      <StepTwo key={1} />,
      <StepThree key={2} />,
      <StepFour key={3} />,
    ],
    "loginUser"
  );
  const { getQuery } = useRouterQuery();

  const methods = useForm({
    resolver: yupResolver(multiStepSchema),
    mode: "all",
  });
  console.log(methods.formState.errors);
  const handleStepChange = (step: string) => {
    changeQuery("step", step);
  };
  const onSubmit = (values: MultiStepPayload) => {
    // const kdmFormValues = values;
    // const reachCinemas = values?.cinemasUsingReach
    //   ?.map((cinema) => cinema.name)
    //   .filter(Boolean) as string[];
    // const nonReachCinemas = values?.cinemasUsingReach
    //   ?.map((cinema) => cinema.name)
    //   .filter(Boolean) as string[];
    // console.log(values);
    // onSave({
    //   validityPeriod: +values.validityPeriod,
    //   // filmId: filmId,
    //   // callbackUrl: "/kdm/confirmation",
    //   nonReachCinemas: values.nonReachCinemas,
    //   reachCinemas: values.reachCinemas || [],
    // });
  };

  return (
    <div className="">
      {stepIndex ? (
        <FormProvider {...methods}>
          <form
            className=""
            id="loginUser"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {stepIndex ? formStep : <></>}
          </form>
        </FormProvider>
      ) : null}
    </div>
  );
};

export default MForm;
