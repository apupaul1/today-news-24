"use client";
import SocialLogin from "@/Components/Auth/SocialLogin";
import { signUp, updateUser } from "@/lib/auth-client";
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
const UpdateProfilePage = () => {
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } =  await updateUser({
      image: userData.image,
      name: userData.name,
    });


    console.log({data,error});

    if (data?.status) {
      toast.success("Account updated successfully");

      router.push("/my-profile");
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
            প্রোফাইল আপডেট
          </Card.Title>
        </Card.Header>
        <Form onSubmit={handleUpdate}>
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
            </div>
          </Card.Content>
          <Card.Footer className="mt-4 flex flex-col gap-2">
            <Button className="w-full rounded-md bg-red-700" type="submit">
              আপডেট করুন
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateProfilePage;
