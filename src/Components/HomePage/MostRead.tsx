import { INews } from "@/types/news.types";
import Link from "next/link";
import React from "react";

const getMostReadNews = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();

  return data.data;
};

const MostRead = async () => {
  const mostReadNews: INews[] = await getMostReadNews();

  return (
    <div className="bg-white border p-5 rounded-lg shadow">
      <h1 className="text-lg font-bold mb-5">সর্বাধিক পঠিত</h1>
      <div className="space-y-5 ">
        {mostReadNews.map((news,ind) => (
          <Link href={`/news/${news.id}`} key={news.id} className="flex items-start"> <span className="text-red-700 font-bold text-xl mr-3">{ind + 1}</span>{news.title}</Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
