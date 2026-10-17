import NewsCard from "@/Components/HomePage/NewsCard";
import { ICategoryNews } from "@/types/news.types";
import { Separator } from "@heroui/react";
import React from "react";


const getNewsByCategory = async (category: string) => {
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${category}`,
  );
  const data = await res.json();
  return data.data;
};

const CategoryWiseNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const categoryNews: ICategoryNews[] = await getNewsByCategory(categoryId);

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <h1 className="mb-2 text-2xl font-semibold">
        {categoryNews[0].category}
      </h1>
      <Separator className="pt-0.75"></Separator>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} t={news.category} news={news}></NewsCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseNews;
