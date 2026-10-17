import { IHeadline } from "@/types/news.types";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";


const getHeadlines = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news");
  const data = await res.json();
  return data.data;
};

const MarqueeNews = async () => {
  const headlines: IHeadline[] = await getHeadlines();

  return (
    <div className="bg-red-700 my-4">
      <div className="flex max-w-7xl mx-auto">
        <Button variant="danger" className="rounded-none">
          সর্বশেষ
        </Button>
        <Marquee pauseOnHover speed={150} loop={0}>
          {headlines.map((headline) => (
            <div key={headline.id} className="ml-10">
              <Link
                href={`/news/${headline.id}`}
                className="text-white text-sm flex gap-2"
              >
                <span>•</span>
                {headline.title}
              </Link>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeNews;
