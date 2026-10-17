import MainNews from "@/Components/HomePage/MainNews";
import MostRead from "@/Components/HomePage/MostRead";
import NewsCard from "@/Components/HomePage/NewsCard";
import { IOtherSection } from "@/types/news.types";
import { Separator } from "@heroui/react";
import Image from "next/image";


const getHomeSectionNews = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  return data.data;
};

export default async function Home() {
  const homeSectionNews: IOtherSection[] = await getHomeSectionNews();

  const [mainNews, ...otherNews] = homeSectionNews;

  return (
    <div className="flex gap-5 max-w-7xl mx-auto">
      <div className="flex-2">
        {/* Main News */}
        <MainNews mainNews={mainNews}></MainNews>

        <div>
          {otherNews
            .filter((on) => on.curationType !== "tipo-curation")
            .map((news: IOtherSection) => (
              <div key={news.curationId}>
                <div className="my-8">
                  <h1 className="mb-2">{news.title}</h1>
                  <Separator className="pt-0.75"></Separator>

                  <div className="grid grid-cols-3 gap-4 mt-7">
                    {news.articles.map((ne) => (
                      <NewsCard key={ne.id} news={ne} t={news.title}></NewsCard>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex-1">
        {/* Most read News */} 
        <MostRead></MostRead>
      </div>
    </div>
  );
}
