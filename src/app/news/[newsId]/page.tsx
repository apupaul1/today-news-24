import { INewsDetails } from "@/types/news.types";
import { Chip, Description } from "@heroui/react";
import Image from "next/image";
import React from "react";

const getNewsDetails = async (newsId: string) => {
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
  );
  const data = await res.json();

  return data.data;
};

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const news: INewsDetails = await getNewsDetails(newsId);

  if (!news) {
    return <h1>Not Found News</h1>;
  }

  const datePart = new Date(news?.firstPublished).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timePart = new Date(news?.firstPublished).toLocaleTimeString("bn-BD", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${datePart} এ ${timePart}`;

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <h1 className="text-2xl font-semibold mb-6">{news.title}</h1>
      {/* image */}
      <p>{news.description.blocks[0].model.blocks[0].model.text}</p>

      <div className="border-t border-b my-5 py-3 text-gray-500 flex gap-5">
        <h3>{news?.byline[0]?.name}</h3>
        <p>{formattedDateTime}</p>
        <p>{news.wordCount} শব্দ</p>
      </div>

      <Image
        src={news.body[0].url!}
        alt={news.body[0].altText!}
        width={400}
        height={400}
        className="w-full rounded-xl"
        loading="eager"
      ></Image>

      <small className="text-gray-500">{news.body[0].caption}</small>

      <p className="my-7 text-justify">{news.text}</p>

      <div className="space-x-5">
        {news.tags.map((tag, ind) => (
          <Chip key={ind} className="px-3">
            {tag}
          </Chip>
        ))}
      </div>

      {/* <div>
        <div>
          <Image
            src={news.body[0].url!}
            alt={news.body[0].altText!}
            width={400}
            height={400}
            className="w-full rounded-xl"
          ></Image>
          <small className="text-gray-500">{news.body[0].caption}</small>
          <br />
          <div className="space-y-4 text-sm my-6">
            <p>{news.body[1].text}</p>
            <p>{news.body[2].text}</p>
            <p>{news.body[3].text}</p>
            <p>{news.body[4].text}</p>
          </div>
        </div>
        <div className="my-6">
          <h1 className="font-semibold">{news.body[5].text}</h1>
          <div className="space-y-4 text-sm mt-4">
            <p>{news.body[6].text}</p>
            <p>{news.body[7].text}</p>
            <p>{news.body[8].text}</p>
          </div>
        </div>
        <div className="my-6">
          <h1 className="font-semibold">{news.body[9].text}</h1>
          <div className="space-y-4 text-sm mt-4">
            <p>{news.body[10].text}</p>
          </div>
        </div>

        <div>
          <Image
            src={news.body[11].url!}
            alt={news.body[11].altText!}
            width={400}
            height={400}
            className="w-full rounded-xl"
          ></Image>
          <small className="text-gray-500">{news.body[11].caption}</small>
          <br />
          <p className="my-6 text-sm">{news.body[12].text}</p>
        </div>

        <div className="my-6">
          <h1 className="font-semibold">{news.body[13].text}</h1>
          <div className="space-y-4 text-sm mt-4">
            <p>{news.body[14]?.text}</p>
            <p>{news.body[15]?.text}</p>
          </div>
        </div>

        <div>
          <Image
            src={news.body[16].url!}
            alt={news.body[16].altText!}
            width={400}
            height={400}
            className="w-full rounded-xl"
          ></Image>
          <small className="text-gray-500">{news.body[16].caption}</small>
          <div className="my-6">
            <h1 className="font-semibold">{news.body[17].text}</h1>
            <div className="space-y-4 text-sm mt-4">
              <p>{news.body[18].text}</p>
            </div>
          </div>
        </div>

        <div className="space-x-5">
            {
                news.tags.map((tag,ind) => <Chip key={ind} className="px-3">{tag}</Chip>)
            }
        </div>
      </div> */}
    </div>
  );
};

export default NewsDetailsPage;
