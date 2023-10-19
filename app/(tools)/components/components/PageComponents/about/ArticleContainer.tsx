import React from "react";
import Image from "next/image";

import dataArticle from "@/app/(tools)/data/data_article.json";
import { ArticleType } from "@/app/(tools)/types";
import dayjs from "dayjs";

type ArticleProps = {
  category: string;
};

const ArticleContainer = ({ category }: ArticleProps) => {
  return (
    <article className="  flex flex-col gap-3 ">
      <h3 className="text-left py-2">{category}</h3>
      <div className="">
        {dataArticle
          .filter(
            (item) => item.category === category && item.featured === true
          )
          .map((articleItem: ArticleType, index: number) => {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-greyLit w-full"
              >
                <div className=" h-full w-full overflow-hidden rounded-sm">
                  <Image
                    rel="preload"
                    placeholder="empty"
                    loading="lazy"
                    src={`/images/news/${articleItem.img}.jpg`}
                    alt={articleItem.img}
                    height={400}
                    width={700}
                    className="object-center object-cover h-full w-full "
                  />
                </div>
                <div className="bg-white rounded-sm px-3 md:px-5 py-2 w-full flex flex-col gap-2">
                  <h4 className="text-left tracking-wide leading-5">
                    {articleItem.title}
                  </h4>
                  <p className="footnote-1">
                    {dayjs(articleItem.date).format("DD MMMM YYYY")}
                  </p>
                  <div className="hidden md:block">
                    {articleItem.text.map((item, itemIndex) => {
                      return (
                        <p className="body-3 w-full 0" key={itemIndex}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                  <div className="block md:hidden">
                    {articleItem.text.slice(0, 1).map((item, itemIndex) => {
                      return (
                        <p className="body-3 w-full " key={itemIndex}>
                          {item}
                        </p>
                      );
                    })}
                  </div>
                  <a
                    href={articleItem.news_link}
                    className="footnote-1 text-right underline hover:font-medium"
                  >
                    Artikel selengkapnya bisa dilihat di{" "}
                    <span className=" text-greenUrip">
                      {articleItem.newspaper}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3   ">
          {dataArticle
            .filter(
              (item) => item.category === category && item.featured === false
            )
            .map((articleItem: ArticleType, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-sm shadow-sm grid grid-cols-5 md:grid-cols-1 "
                >
                  <div className="col-span-1  md:col-span-full w-full aspect-square md:aspect-auto">
                    <Image
                      src={`/images/news/${articleItem.img}.jpg`}
                      alt={articleItem.img}
                      height={300}
                      width={300}
                      className="object-center object-cover h-full md:h-[150px] w-full  overflow-hidden rounded-sm"
                    />
                  </div>
                  <div className=" col-span-4 md:col-span-full p-1 md:p-3 flex flex-col justify-between">
                    <h6 className=" tracking-normal leading-5 h-fit md:h-12 mb-2">
                      {articleItem.title}
                    </h6>
                    <p className="footnote-1">
                      {dayjs(articleItem.date).format("DD MMMM YYYY")}
                    </p>
                    <p className="body-3 h-28 hidden md:block">
                      {articleItem.text[0].slice(0, 150)}...(cont)
                    </p>
                    <a
                      href={articleItem.news_link}
                      className="footnote-1 text-right underline hover:font-medium"
                    >
                      Artikel lengkap bisa dilihat di&nbsp;
                      <span className=" text-greenUrip">
                        {articleItem.newspaper}
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
};

export default ArticleContainer;
