"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { signIn } from "@/lib/auth-client";
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

const SignInPage = () => {
  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "http://localhost:3000",
    });

    if (data) {
      toast.success("Login Sucessful");
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
            সাইন ইন
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handleSignin}>
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
              <TextField name="password" type="password">
                <Label>পাসওয়ার্ড</Label>
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
              সাইন ইন করুন
            </Button>
            <div className="w-full">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-red-700 transition-colors"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="text-center text-sm">
              অ্যাকাউন্ট নেই?
              <Link href={"/signup"} className="text-red-700 font-semibold">
                সাইন আপ করুন
              </Link>
            </div>
          </Card.Footer>
        </Form>

        <SocialLogin></SocialLogin>
      </Card>
    </div>
  );
};

export default SignInPage;
