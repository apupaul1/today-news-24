"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { signUp } from "@/lib/auth-client";
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

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      callbackURL: "http://localhost:3000",
    });

    if (data) {
      toast.success("Account created successfully");

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
            সাইন আপ
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handleSignup}>
          <Card.Content>
            <div className="flex flex-col gap-4">
              <TextField name="name" type="text">
                <Label>নাম</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                  className="rounded-md"
                />
              </TextField>
              <TextField name="image" type="url">
                <Label>Image</Label>
                <Input
                  placeholder="https://img.heroui.chat/image..."
                  variant="secondary"
                  className="rounded-md"
                />
              </TextField>
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
              সাইন আপ করুন
            </Button>
            <div className="text-center text-sm">
              অ্যাকাউন্ট আছে?{" "}
              <Link href={"/signin"} className="text-red-700 font-semibold">
                সাইন ইন করুন
              </Link>
            </div>
          </Card.Footer>
        </Form>

        <SocialLogin></SocialLogin>
      </Card>
    </div>
  );
};

export default SignupPage;
