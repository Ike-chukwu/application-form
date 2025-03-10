"use client";
import AccountForm from "@/components/AccountForm";
import React, { Suspense } from "react";

const Account = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <MyComponent /> */}
      <div className="flex justify-center py-8 ">
        <AccountForm />
      </div>
    </Suspense>
  );
};

export default Account;
