"use client";
import AccountForm from "@/components/AccountForm";
import Link from "next/link";
import React from "react";

const Account = () => {
  return (
    <div className="flex justify-center py-8 ">
      <AccountForm
        isLoading={false}
        onSave={() => {
          console.log("yes");
        }}
      />
    </div>
  );
};

export default Account;
