"use client";
import dataArticle from "@/app/(tools)/data/data_article.json";
import { ArticleType } from "@/app/(tools)/types";
import dayjs from "dayjs";
import Image from "next/image";

import React from "react";

type Props = {};

const Activity = (props: Props) => {
  return (
    <div className="page-main-container">
      <div className=" grid grid-cols-4 w-full gap-10 h-screen relative snap-center p-14">
        <section className="col-span-3  h-screen  scrollbar-none bg-greyLit gap-5 flex flex-col">
          <h2 className=" text-left bg-greyLit">AKTIVITAS RS URIP SUMOHARJO</h2>

          <ArticleContainer category="kiprah" />
          <ArticleContainer category="aksi" />
        </section>
        <section className="col-span-1 pt-20  bg-greyLit h-screen border-l pl-10 border-b-0 ">
          <div className="mb-2">
            <p className="btn-3-bold border-b-0">Terbaru</p>
            <div className="">
              {dataArticle
                .map((item: ArticleType) => new Date(item.date))
                .sort((a: any, b: any) => b - a)
                .map((item: any, index: number) => {
                  return (
                    <p
                      key={index}
                      className="body-3 leading-normal text-greyMed1"
                    >
                      {dayjs(item).format("DD MMMM YYYY")}
                    </p>
                  );
                })}
            </div>
          </div>
          <div>
            <p className="btn-3-bold">Kategori:</p>
            <p> Kiprah, Aksi </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Activity;
type ArticleProps = {
  category: string;
};
const ArticleContainer = ({ category }: ArticleProps) => {
  return (
    <article className="  flex flex-col gap-3">
      <h4 className="text-left py-2">{category}</h4>
      <div className="">
        {dataArticle
          .filter(
            (item) => item.category === category && item.featured === true
          )
          .map((articleItem: ArticleType, index: number) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 gap-3 bg-greyLit w-full"
              >
                <div>
                  <Image
                    src={`/images/news/${articleItem.img}.jpg`}
                    alt={articleItem.img}
                    height={400}
                    width={700}
                    className="object-center object-cover h-[300px] overflow-hidden rounded-sm"
                  />
                </div>
                <div className="bg-white rounded-sm px-5 py-2 w-full flex flex-col gap-2">
                  <h4 className="text-left tracking-wide leading-5">
                    {articleItem.title}
                  </h4>
                  <p className="footnote-1">
                    {dayjs(articleItem.date).format("DD MMMM YYYY")}
                  </p>
                  <div>
                    {articleItem.text.map((item, itemIndex) => {
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
        <div className="grid grid-cols-3 gap-3   ">
          {dataArticle
            .filter(
              (item) => item.category === category && item.featured === false
            )
            .map((articleItem: ArticleType, index: number) => {
              return (
                <div key={index} className="bg-white rounded-sm shadow-sm ">
                  <div>
                    <Image
                      src={`/images/news/${articleItem.img}.jpg`}
                      alt={articleItem.img}
                      height={200}
                      width={300}
                      className="object-center object-cover h-[150px] w-full overflow-hidden rounded-sm"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-between">
                    <p className="btn-5-bold h-12">{articleItem.title}</p>
                    <p className="footnote-1">
                      {dayjs(articleItem.date).format("DD MMMM YYYY")}
                    </p>
                    <p className="body-3 h-28">
                      {articleItem.text.slice(0, 1)}
                    </p>
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
      </div>
    </article>
  );
};
