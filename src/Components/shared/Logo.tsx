import Image from "next/image";
import React from "react";

const Logo = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="flex gap-2 items-center">
      <div>
        <Image
          src={"/logo.webp"}
          alt="today news 24"
          width={40}
          height={40}
        ></Image>
      </div>
      <div>
        <h1 className="text-red-700 text-2xl font-bold">Today News 24</h1>
        <p className="text-xs text-gray-700">{date}</p>
      </div>
    </div>
  );
};

export default Logo;
