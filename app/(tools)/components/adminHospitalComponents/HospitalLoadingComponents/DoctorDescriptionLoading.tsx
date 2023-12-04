import React from "react";

type Props = {};

const DoctorDescriptionLoading = (props: Props) => {
  return (
    <>
      <div className="column-description-container flex items-center justify-center gap-2 ">
        <h3>Loading</h3>
        <div className="mx-auto w-fit h-fit animate-spin origin-center">
          {" "}
          {loaderServer}
        </div>
      </div>
    </>
  );
};

export default DoctorDescriptionLoading;

export const loaderServer2 = (
  <svg
    fill="#007814"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 26.349 26.35"
    xmlSpace="preserve"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <g>
          {" "}
          <circle cx="13.792" cy="3.082" r="3.082"></circle>{" "}
          <circle cx="13.792" cy="24.501" r="1.849"></circle>{" "}
          <circle cx="6.219" cy="6.218" r="2.774"></circle>{" "}
          <circle cx="21.365" cy="21.363" r="1.541"></circle>{" "}
          <circle cx="3.082" cy="13.792" r="2.465"></circle>{" "}
          <circle cx="24.501" cy="13.791" r="1.232"></circle>{" "}
          <path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z"></path>{" "}
          <circle cx="21.364" cy="6.218" r="0.924"></circle>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
);

export const loaderServer = (
  // <?xml version="1.0" encoding="iso-8859-1"?>
  // <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg
    height="100px"
    width="100px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 496 496"
    xmlSpace="preserve"
  >
    <path
      fill="#007814"
      opacity={1}
      d="M248,92c-13.6,0-24-10.4-24-24V24c0-13.6,10.4-24,24-24s24,10.4,24,24v44C272,80.8,261.6,92,248,92z"
    />
    <path
      fill="#007814"
      opacity={0.9}
      d="M248,496c-13.6,0-24-10.4-24-24v-44c0-13.6,10.4-24,24-24s24,10.4,24,24v44
	C272,485.6,261.6,496,248,496z"
    />
    <path
      fill="#007814"
      opacity={0.6}
      d="M157.6,116c-8,0-16-4-20.8-12l-21.6-37.6c-6.4-11.2-2.4-26.4,8.8-32.8s26.4-2.4,32.8,8.8L178.4,80
	c6.4,11.2,2.4,26.4-8.8,32.8C166.4,114.4,161.6,116,157.6,116z"
    />
    <path
      fill="#007814"
      opacity={0.3}
      d="M360,465.6c-8,0-16-4-20.8-12L317.6,416c-6.4-11.2-2.4-26.4,8.8-32.8c11.2-6.4,26.4-2.4,32.8,8.8
	l21.6,37.6c6.4,11.2,2.4,26.4-8.8,32.8C368,464.8,364,465.6,360,465.6z"
    />
    <path
      fill="#007814"
      opacity={0.1}
      d="M92,181.6c-4,0-8-0.8-12-3.2l-37.6-21.6c-11.2-6.4-15.2-21.6-8.8-32.8s21.6-15.2,32.8-8.8l37.6,21.6
	c11.2,6.4,15.2,21.6,8.8,32.8C108,177.6,100,181.6,92,181.6z"
    />
    <path
      fill="#007814"
      opacity={0.05}
      d="M442.4,384c-4,0-8-0.8-12-3.2L392,359.2c-11.2-6.4-15.2-21.6-8.8-32.8c6.4-11.2,21.6-15.2,32.8-8.8
	l37.6,21.6c11.2,6.4,15.2,21.6,8.8,32.8C458.4,380,450.4,384,442.4,384z"
    />
    <path
      fill="#007814"
      opacity={0.1}
      d="M68,272H24c-13.6,0-24-10.4-24-24s10.4-24,24-24h44c13.6,0,24,10.4,24,24S80.8,272,68,272z"
    />
    <path
      fill="#007814"
      opacity={0.3}
      d="M472,272h-44c-13.6,0-24-10.4-24-24s10.4-24,24-24h44c13.6,0,24,10.4,24,24S485.6,272,472,272z"
    />
    <path
      fill="#007814"
      opacity={0.6}
      d="M53.6,384c-8,0-16-4-20.8-12c-6.4-11.2-2.4-26.4,8.8-32.8l37.6-21.6c11.2-6.4,26.4-2.4,32.8,8.8
	c6.4,11.2,2.4,26.4-8.8,32.8l-37.6,21.6C62.4,383.2,58.4,384,53.6,384z"
    />
    <path
      fill="#007814"
      opacity={0.1}
      d="M404,181.6c-8,0-16-4-20.8-12c-6.4-11.2-2.4-26.4,8.8-32.8l37.6-21.6c11.2-6.4,26.4-2.4,32.8,8.8
	s2.4,26.4-8.8,32.8L416,178.4C412,180.8,408,181.6,404,181.6z"
    />
    <path
      fill="#007814"
      opacity={0.9}
      d="M136,465.6c-4,0-8-0.8-12-3.2c-11.2-6.4-15.2-21.6-8.8-32.8l21.6-37.6c6.4-11.2,21.6-15.2,32.8-8.8
	c11.2,6.4,15.2,21.6,8.8,32.8l-21.6,37.6C152,461.6,144,465.6,136,465.6z"
    />
    <path
      fill="#007814"
      opacity={1}
      d="M338.4,116c-4,0-8-0.8-12-3.2c-11.2-6.4-15.2-21.6-8.8-32.8l21.6-37.6c6.4-11.2,21.6-15.2,32.8-8.8
	c11.2,6.4,15.2,21.6,8.8,32.8L359.2,104C354.4,111.2,346.4,116,338.4,116z"
    />
  </svg>
);
