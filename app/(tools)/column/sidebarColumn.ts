export type SidebarBtnType = {
  name: string;
  key: string;
  column_category: string;
  column_open: string;
};

export const patientBtnDetail = [
  {
    name: "Profil Pasien",
    key: "patient_profile",
    column_category: "profile",
    column_open: "one",
  },
  {
    name: "Jadwal",
    key: "scheduled_appointments",
    column_category: "schedule",
    column_open: "all",
  },
  {
    name: "Rekam Medis",
    key: "medical_records",
    column_category: "medical",
    column_open: "one",
  },
];
