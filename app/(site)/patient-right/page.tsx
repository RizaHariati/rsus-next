"use client";
import React, { useState } from "react";
import {
  faCaretRight,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import hak from "../../(tools)/data/data_hak_kewajiban.json";
type Props = {};

const PatientRight = (props: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const toggle = (id: number) => {
    if (selected === id) {
      return setSelected(null);
    } else {
      setSelected(id);
    }
  };
  return (
    <div className="page-main-container pt-14">
      <h2>HAK DAN KEWAJIBAN PASIEN</h2>
      {hak.map((pasal) => {
        const { menu, title, rules } = pasal;
        return (
          <div key={menu} className="mx-auto text-greyDrk  ">
            <div className="w-full md:w-9/12 mx-auto ">
              <div className="w-full  px-5">
                <p className="btn-1 capitalize text-center my-5">{title}</p>
              </div>
              <div className=" text-greyDrk  ">
                {rules.map((rule) => {
                  const { id, title, info } = rule;
                  return (
                    <div
                      key={id}
                      className={
                        selected === id
                          ? "bg-white bg-opacity-70 hover:bg-opacity-100 rounded-sm shadow-sm mb-2 px-7 transition-all overflow-hidden min-h-full"
                          : "bg-white bg-opacity-70 hover:bg-opacity-100 rounded-sm shadow-sm mb-2 px-7 transition-all overflow-hidden h-14"
                      }
                    >
                      <div
                        className="flex items-center justify-between border-b-greyBorder transition-all"
                        style={
                          selected != id
                            ? { borderBottomWidth: "0px" }
                            : { borderBottomWidth: "1px" }
                        }
                      >
                        <h5 className="text-greyDrk font-normal py-2 text-left h-14">
                          {title}
                        </h5>
                        <button
                          onClick={() => {
                            toggle(id);
                          }}
                        >
                          <FontAwesomeIcon
                            className=" text-greyMed1 active:text-greyDrk hover:text-greyMed2 transition-all"
                            icon={
                              selected === id ? faMinusCircle : faPlusCircle
                            }
                          />
                        </button>
                      </div>

                      <ul
                        className={
                          selected === id
                            ? "py-3 transition-all "
                            : "py-0 transition-all"
                        }
                      >
                        {info.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="grid items-start m-2"
                              style={{ gridTemplateColumns: "1fr 14fr" }}
                            >
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="text-greyMed2 mt-2"
                              />
                              <p className="leading-5">{item}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatientRight;
