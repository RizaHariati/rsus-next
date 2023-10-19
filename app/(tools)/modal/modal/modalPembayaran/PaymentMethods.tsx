import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const paymentMethod = [
  {
    id: 1,
    title: "Internet Banking BCA",
    img: "BCA",
    selected: false,
  },
  {
    id: 2,
    title: "GoPay",
    img: "Gopay",
    selected: true,
  },
];

type Props = {};

const PaymentMethods = (props: Props) => {
  return (
    <div className=" standard-border p-2">
      {paymentMethod.map((item) => {
        return (
          <button
            key={item.id}
            className="w-full flex-center-between gap-2 border-white standard-border p-2 hover:border-greyBorder transition-all cursor-pointer hover:bg-greyLit"
          >
            <Image
              rel="preload"
              placeholder="empty"
              src={`/images/icons/consultation-icons/${item.img}.jpg`}
              alt={item.img}
              width={70}
              height={40}
              className="w-auto h-full rounded-sm object-cover object-center"
              loading="lazy"
            />
            <p className="text-left mr-auto ">{item.title}</p>
            <FontAwesomeIcon
              className={item.selected ? "text-greenUrip" : "text-greyMed1"}
              icon={item.selected ? faCircleCheck : faCircle}
            />
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethods;
