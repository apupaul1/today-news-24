"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const SocialLogin = () => {
  const handleGoogleSignIn = async () => {
    const resData = await signIn.social({
      provider: "google",
    });

    console.log("after google sign in", resData);
  };
  const handleGithubSignIn = async () => {
    const { data, error } = await signIn.social({
      provider: "github",
    });

    console.log({ data, error });
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        onClick={handleGoogleSignIn}
        className="w-full"
        variant="tertiary"
      >
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>
      <Button
        onClick={handleGithubSignIn}
        className="w-full"
        variant="tertiary"
      >
        <Icon icon="mdi:github" />
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default SocialLogin;
