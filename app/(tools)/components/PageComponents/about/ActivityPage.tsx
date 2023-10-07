"use client";

import dataArticle from "@/app/(tools)/data/data_article.json";
import { ArticleType } from "@/app/(tools)/types";

import ArticleContainer from "./ArticleContainer";
import moment from "moment";

type Props = {};
function ActivityPage(props: Props) {
  return (
    <div className="page-main-container h-fit bg-greyLit">
      <div className=" grid grid-cols-4 w-full gap-10 h-fit relative p-3 md:p-14 pt-16 ">
        <section className="col-span-full md:col-span-3  h-full md:h-[calc(100vh-56px)] custom-scrollbar  scrollbar-none bg-greyLit gap-2 md:gap-5 flex flex-col">
          <h2 className=" text-left bg-greyLit tracking-[5px]">
            AKTIVITAS RS URIP SUMOHARJO
          </h2>

          <ArticleContainer category="kiprah" />
          <ArticleContainer category="aksi" />
        </section>
        <section className="hidden md:block col-span-1 pt-20  bg-greyLit h-full border-l pl-10 border-b-0 ">
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
                      {moment(item).format("DD MMMM YYYY")}
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
}

export default ActivityPage;
