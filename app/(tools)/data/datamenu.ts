import { DataMenuType } from "../types";

export const datamenu: DataMenuType[] = [
  {
    id: 1,
    name: "about-group",
    title: "Tentang RS Urip Sumoharjo",
    link: "",
    subdata: [
      {
        name: "about",
        title: "Tentang",
        link: "/about-group/about",
        type: "link",
      },
      {
        name: "activity",
        title: "Aktivitas Kami",
        link: "/about-group/activity",
        type: "link",
      },
      {
        name: "about",
        title: "Tim RS Urip Sumoharjo",
        link: "/about-group/team",
        type: "link",
      },
    ],
  },
  {
    id: 2,
    name: "patient-right",
    title: "Tentang RS Urip Sumoharjo",
    link: "/patient-right",
    subdata: [],
  },
  {
    id: 3,
    name: "consultation",
    title: "Tentang RS Urip Sumoharjo",
    link: "/appointment",
    subdata: [
      {
        name: "appointment",
        title: "Janji Temu Dokter",
        link: "",
        type: "modal",
      },
      {
        name: "telemedicine",
        title: "Telemedicine",
        link: "",
        type: "modal",
      },
      {
        name: "registration",
        title: "Daftar Pasien Baru",
        link: "",
        type: "modal",
      },
    ],
  },
  {
    id: 4,
    name: "facility",
    title: "Fasilitas",
    link: "/facility",
    subdata: [],
  },
  {
    id: 5,
    name: "poliklinik",
    title: "Poliklinik",
    link: "/poliklinik",
    subdata: [],
  },
  {
    id: 6,
    name: "laboratorium",
    title: "Laboratorium dan Check Up",
    link: "/laboratorium",
    subdata: [],
  },
  {
    id: 7,
    name: "inpatient",
    title: "Rawat Inap",
    link: "/inpatient",
    subdata: [],
  },
];
