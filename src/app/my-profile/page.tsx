"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatDate(value?: string | Date | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString();
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-slate-500">{label}</span>
      <span className="break-all font-mono text-xs text-slate-700 sm:max-w-[65%] sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default function MyProfile() {
  const { data, isPending } = useSession();
  const router = useRouter();

  const user = data?.user;
  const session = data?.session;

  if (isPending) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <p className="text-center text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!user || !session) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="p-6">
          <p className="text-center text-slate-600">
            Unable to load your profile. Please sign in again.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 sm:p-6">
      {/* Account and Session Details */}
      <div>
        <Card className="p-5 shadow-md">
          <div className="mb-4 border-b border-slate-200 pb-4 flex justify-between items-center">
            <div className="flex gap-5">
              <Avatar>
                <Avatar.Image
                  src={
                    user?.image ||
                    "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                  }
                  alt={user.name}
                />
              </Avatar>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Account Info
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Account creation and update information
                </p>
              </div>
            </div>

            <Link href={"/update-profile"}>
              <Button
                // color="danger"
                onPress={() => router.push("/profile/edit")}
                className="font-medium"
              >
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <DetailRow label="User Name" value={user.name} />
            <DetailRow label="User Email" value={user.email} />
            <DetailRow
              label="Account Created"
              value={formatDate(user.createdAt)}
            />

            <DetailRow
              label="Profile Updated"
              value={formatDate(user.updatedAt)}
            />

            <DetailRow
              label="Email Status"
              value={user.emailVerified ? "Verified" : "Not verified"}
            />
          </div>
        </Card>
      </div>

      {/* Device Information */}
      <Card className="p-5 shadow-md">
        <div className="mb-4 border-b border-slate-200 pb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Device Information
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Browser and device details for the current session
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold text-slate-800">
            User Agent
          </p>

          <p className="break-all font-mono text-xs leading-relaxed text-slate-600">
            {session.userAgent || "Not available"}
          </p>
        </div>
      </Card>
    </div>
  );
}
