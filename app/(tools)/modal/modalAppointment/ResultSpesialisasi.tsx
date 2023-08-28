import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Image from "next/image";
import { ConsultationMenuTypes, PoliklinikType } from "@/app/(tools)/types";

type ResultProps = {
  searchKeyword: string;
  consultationInfo: ConsultationMenuTypes;
  specializationList: PoliklinikType[];
  searchCategory: "spesialisasi" | "dokter";
};
const ResultSpesialisasi = ({
  searchKeyword,
  consultationInfo,
  specializationList,
  searchCategory,
}: ResultProps) => {
  const {
    filteringDoctor,
    state: { modalTitle, selected_date },
  } = useGlobalContext();

  return (
    <div className={modalTitle === "appointment" ? "h-40" : "h-64"}>
      {!searchKeyword && consultationInfo.modal_img && (
        <div className="w-full h-full  my-auto">
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/pages/${consultationInfo.modal_img}.jpg`}
            alt={consultationInfo.modal_img}
            width={400}
            height={400}
            className="w-auto h-full m-auto"
            loading="lazy"
          />
        </div>
      )}
      {searchKeyword && specializationList.length > 0 && (
        <div className="w-full h-full my-auto custom-scrollbar flex flex-col gap-2 px-2">
          <h4>Pilih satu spesialis/klinik</h4>
          {specializationList.map((item) => {
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  if (selected_date) {
                    return filteringDoctor(
                      item.id,
                      searchCategory,
                      selected_date
                    );
                  } else {
                    filteringDoctor(item.id, searchCategory);
                  }
                }}
                className="standard-border p-2 w-full text-left overflow-visible hover:bg-greyLit transition-all"
              >
                <p>{item.title}</p>
              </button>
            );
          })}
        </div>
      )}
      {searchKeyword && specializationList.length < 1 && (
        <div className="w-full h-full my-auto ">
          <p className="btn-3-bold text-center">
            Tidak ditemukan Spesialisasi dengan kata kunci seperti itu
          </p>

          {consultationInfo.modal_img && (
            <div className="w-full h-full my-auto">
              <Image
                rel="preload"
                placeholder="empty"
                src={`/images/pages/${consultationInfo.modal_img}.jpg`}
                alt={consultationInfo.modal_img}
                width={400}
                height={400}
                className="w-auto h-full m-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultSpesialisasi;
