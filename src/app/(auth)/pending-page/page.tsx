"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PendingForVerification = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace("/");
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <div className="mb-5 text-5xl">📩</div>

        <h1 className="text-2xl font-semibold">Waiting for Verification</h1>

        <p className="mt-3 text-sm text-gray-500">
          We've sent a verification link to your email. Please check your inbox
          and click the link to verify your account.
        </p>

        <p className="mt-5 text-sm text-gray-600">
          Redirecting to home in{" "}
          <span className="font-semibold text-blue-600">{seconds}s</span>
        </p>
      </div>
    </div>
  );
};

export default PendingForVerification;
