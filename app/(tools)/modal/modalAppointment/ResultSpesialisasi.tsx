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
    <div
      className={
        modalTitle === "appointment"
          ? "h-40 custom-scrollbar standard-border  "
          : "h-40 md:h-64 custom-scrollbar md:border-none standard-border "
      }
    >
      {!searchKeyword && consultationInfo.modal_img && (
        <ImageSearch consultationInfo={consultationInfo!} />
      )}
      {searchKeyword && specializationList.length > 0 && (
        <div className="w-full h-full h-max-40 my-auto flex flex-col gap-2 px-2">
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
                className="button-long"
              >
                <p>{item.title}</p>
              </button>
            );
          })}
        </div>
      )}
      {searchKeyword && specializationList.length < 1 && (
        <div className="w-full h-full h-max-40 my-auto ">
          <p className="btn-3-bold text-center">
            Tidak ditemukan Spesialisasi dengan kata kunci seperti itu
          </p>

          {consultationInfo.modal_img && (
            <ImageSearch consultationInfo={consultationInfo!} />
          )}
        </div>
      )}
    </div>
  );
};

export default ResultSpesialisasi;

type ImageProps = {
  consultationInfo: ConsultationMenuTypes;
};

const ImageSearch = ({ consultationInfo }: ImageProps) => {
  return (
    <div className="w-auto h-40 my-auto ">
      {consultationInfo && (
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pages/${consultationInfo.modal_img}.jpg`}
          alt={consultationInfo.modal_img || "consul_img"}
          width={400}
          height={400}
          className="w-auto h-40 m-auto"
          loading="lazy"
        />
      )}
    </div>
  );
};
