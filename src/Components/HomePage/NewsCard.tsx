import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export interface NewsCardProps {
  news: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished: Date
  };

  t: string;
}

const NewsCard = ({ news, t }: NewsCardProps) => {

  return (
    <Link href={`/news/${news.id}`}>
      <Card className="rounded-xl p-0 h-full">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          width={420}
          height={420}
          className="rounded-tl-2xl rounded-tr-2xl h-50"
        ></Image>
        <Card.Header className="p-3">
          <h1 className="text-red-700 font-bold text-sm">{t}</h1>
          <Card.Title className="text-[17px]">{news.title}</Card.Title>
          <Card.Description className="line-clamp-2 hyphens-auto">
            {news.description}
          </Card.Description>
          <p className="text-gray-400 text-sm mt-3">
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
              dateStyle: "full",
            })}
          </p>
        </Card.Header>
      </Card>
    </Link>
  );
};

export default NewsCard;
