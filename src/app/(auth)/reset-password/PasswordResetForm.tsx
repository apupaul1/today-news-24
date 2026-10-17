"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { resetPassword, signIn } from "@/lib/auth-client";
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
import { redirect, useSearchParams } from "next/navigation";

const PasswordResetForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  if (!token) {
    toast.danger("Token is invalid");
    redirect("/signin");
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await resetPassword({
      newPassword: userData.password,
      token,
    });

    if (data) {
      toast.success("Password Reset Sucessful");
      redirect('/')
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
        <Form onSubmit={handleChangePassword}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              <TextField name="password" type="password">
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
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetForm;
