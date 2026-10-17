import { IOtherSection } from "@/types/news.types";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface MainNewsProps {
  mainNews: IOtherSection;
}

const MainNews = ({ mainNews }: MainNewsProps) => {
  const [firstNews, ...otherNews] = mainNews.articles;

  return (
    <div className="flex gap-5">
      <Link href={`/news/${firstNews.id}`} className="flex-1">
        <Card className="rounded-xl p-0">
          <Image
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
            width={420}
            height={400}
            className="rounded-tl-2xl rounded-tr-2xl"
            loading="eager"
          ></Image>
          <Card.Header className="p-3">
            <h1 className="text-red-700 font-bold text-sm">প্রধান খবর</h1>
            <Card.Title className="text-lg">{firstNews.title}</Card.Title>
            <Card.Description>{firstNews.description}</Card.Description>
          </Card.Header>
        </Card>
      </Link>
      <div className="flex-1">
        {otherNews.slice(1, 5).map((news) => (
          <Link href={`/news/${news.id}`} key={news.id}>
            <Card  className="rounded-none border-b-2 pb-6.5">
              <Card.Header>
                <h1 className="text-red-700 font-bold text-sm">প্রধান খবর</h1>
                <Card.Title>{news.title}</Card.Title>
              </Card.Header>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
