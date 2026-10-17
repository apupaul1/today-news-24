"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { changePassword, signUp } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
  const router = useRouter();

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await changePassword({
      newPassword: userData.newPassword, // required, The new password to set
      currentPassword: userData.currentPassword, // required, The current user password
      revokeOtherSessions: false, // When set to true, all other active sessions for this user will be invalidated
    });

    if (data) {
      toast.success("Password change sucessfully");

      router.push("/");
    }

    if (error) {
      toast.danger(error.message);
      return;
    }
  };
  return (
    <div>
      <Card className="w-full max-w-md mx-auto shadow-none">
        <Card.Header>
          <Card.Title className="text-center text-2xl text-red-700 font-bold">
            পাসওয়ার্ড পরিবর্তন
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handlePasswordChange}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              <TextField name="currentPassword" type="password">
                <Label>বর্তমান পাসওয়ার্ড</Label>
                <Input
                  placeholder="••••••••"
                  variant="secondary"
                  className="rounded-md"
                />
              </TextField>
              <TextField name="newPassword" type="password">
                <Label>নতুন পাসওয়ার্ড</Label>
                <Input
                  placeholder="••••••••"
                  variant="secondary"
                  className="rounded-md"
                />
              </TextField>
            </div>
          </Card.Content>
          <Card.Footer className="mt-4 flex flex-col gap-2">
            <Button className="w-full rounded-md bg-red-700" type="submit">
              পরিবর্তন করুন
            </Button>
            <div className="w-full">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-red-700 transition-colors"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
