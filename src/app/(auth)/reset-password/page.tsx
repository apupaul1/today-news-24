import React, { Suspense } from "react";
import PasswordResetForm from "./PasswordResetForm";
import { Spinner } from "@heroui/react";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<Spinner></Spinner>}>
        <PasswordResetForm></PasswordResetForm>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
