"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Avatar, Button, Popover, Spinner, toast } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

const Header = () => {
  const { data: session, isPending } = useSession();

  const handleSignout = async () => {
    const { data, error } = await signOut();

    if (data?.success) {
      toast.success("Logout sucessfully");
    }
  };

  // console.log(session);

  return (
    <div className="my-2">
      <nav className="sticky top-0 z-40 max-w-7xl mx-auto">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex-1"></div>
          <div className="flex-1">
            <Logo />
          </div>
          <ul className="flex items-center gap-4">
            {isPending ? (
              <Spinner color="success" />
            ) : session?.user ? (
              <li className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <Popover>
                    <Popover.Trigger aria-label="User profile">
                      <div className="flex flex-col items-center">
                        <Avatar>
                          <Avatar.Image
                            alt="John Doe"
                            src={
                              session?.user?.image ||
                              "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                            }
                          />
                          <Avatar.Fallback>
                            {session?.user.name}
                          </Avatar.Fallback>
                        </Avatar>
                        <h1>{session?.user.name}</h1>
                      </div>
                    </Popover.Trigger>

                    <Popover.Content className="max-w-70 overflow-hidden rounded-xl border border-border/80 bg-surface/90 p-0 shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:border-border/90 dark:bg-surface/85 dark:ring-white/10">
                      <Popover.Dialog className="relative p-4">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-neutral-500/6 to-transparent dark:from-neutral-400/8"
                        />
                        <dl className="relative mt-3 space-y-2 text-sm">
                          <dt>
                            <Link href={"/my-profile"}>My Profile</Link>
                          </dt>
                          <dt>
                            <Link href={"/update-profile"}>Update Profile</Link>
                          </dt>
                          <dt>
                            <Link href={"/change-password"}>Change Password</Link>
                          </dt>
                          <dt>
                            <Link href={"/"}>Forget Password</Link>
                          </dt>
                        </dl>
                      </Popover.Dialog>
                    </Popover.Content>
                  </Popover>
                </div>
                <Button
                  onClick={() => handleSignout()}
                  variant="danger"
                  className="rounded-md"
                >
                  সাইন আউট
                </Button>
              </li>
            ) : (
              <>
                <Link href={"/signin"}>
                  <Button variant="outline" className="rounded-md">
                    সাইন ইন
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button variant="danger" className="rounded-md">
                    সাইন আপ
                  </Button>
                </Link>
              </>
            )}
          </ul>
        </header>
      </nav>
    </div>
  );
};

export default Header;
