import React, { useState, CSSProperties, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Image from "next/image";
import { RingLoader } from "react-spinners";
import { motion } from "framer-motion";
import { enterOpacity } from "../framervariants/variants";

type Props = {};

const ModalInConstruction = (props: Props) => {
  const [loading, setloading] = useState(true);
  const { closeModal } = useGlobalContext();
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  return (
    <div className="modal-md p-10 py-5 overflow-hidden bg-white h-[450px]">
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      {loading ? <Spinner /> : <Apology />}
    </div>
  );
};

export default ModalInConstruction;

const Apology = () => {
  return (
    <motion.section
      variants={enterOpacity}
      initial="initial"
      animate="animate"
      className="bg-white flex flex-col gap-3 border-none h-full "
    >
      <div className="w-full flex-center-center flex-col gap-2  standard-border p-2  transition-all cursor-pointer bg-greyLit m-auto">
        <h2>mohon maaf</h2>
        <Image
          rel="preload"
          placeholder="empty"
          src={`/images/pages/sorry.jpg`}
          alt="bca"
          width={400}
          height={300}
          className="w-auto h-full rounded-sm object-cover object-center"
          loading="lazy"
        />
        <p className="btn-2-bold text-center">
          Fasilitas ini sedang dalam perbaikan
        </p>
      </div>
    </motion.section>
  );
};
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#007814",
};
const Spinner = () => {
  return (
    <div className="modal-md p-10 py-5 overflow-hidden flex items-center justify-center flex-col gap-5 bg-white mx-auto h-[370px] border-none">
      <p className="btn-2-bold text-center">Harap tunggu sebentar</p>
      <div className="flex-center-center gap-5">
        <div className="sweet-loading ">
          <RingLoader
            color="#007814"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h3>Loading..</h3>
      </div>
    </div>
  );
};
