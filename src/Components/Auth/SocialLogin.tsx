import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const SocialLogin = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Button className="w-full" variant="tertiary">
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>
      <Button className="w-full" variant="tertiary">
        <Icon icon="mdi:github" />
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default SocialLogin;
