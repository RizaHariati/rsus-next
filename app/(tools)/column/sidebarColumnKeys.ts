export type SidebarBtnType = {
  name: string;
  key: string;
  column_open: string;
};

export const patientBtnDetail: SidebarBtnType[] = [
  {
    name: "Profil Pasien",
    key: "patient_profile",

    column_open: "one",
  },
  {
    name: "Jadwal",
    key: "scheduled_appointments",

    column_open: "all",
  },
  {
    name: "Rekam Medis",
    key: "medical_records",

    column_open: "one",
  },
];

export const hospitalBtnDetail: SidebarBtnType[] = [
  {
    name: "Dokter",
    key: "doctor",
    column_open: "all",
  },
  {
    name: "Fasilitas",
    key: "facility",
    column_open: "all",
  },
  {
    name: "Laboratorium",
    key: "lab_satuan",
    column_open: "all",
  },
  {
    name: "Paket Test",
    key: "lab_paket",
    column_open: "all",
  },
  {
    name: "Rawat Inap",
    key: "inpatient",
    column_open: "all",
  },
];
