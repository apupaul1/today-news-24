"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { requestPasswordReset, signIn } from "@/lib/auth-client";
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

const ForgetPasswordPage = () => {
  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await requestPasswordReset({
      email: userData.email,
      redirectTo: "/reset-password",
    });


    if (data) {
      toast.success("An Email is sent to your email address. Please check.");
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
            পাসওয়ার্ড রিসেট
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handleSendEmail}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              <TextField name="email" type="email">
                <Label>ইমেইল</Label>
                <Input
                  placeholder="email@example.com"
                  variant="secondary"
                  className="rounded-md"
                />
              </TextField>
            </div>
          </Card.Content>
          <Card.Footer className="mt-4 flex flex-col gap-2">
            <Button className="w-full rounded-md bg-red-700" type="submit">
              ভেরিফিকেশন ইমেইল পাঠান
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
