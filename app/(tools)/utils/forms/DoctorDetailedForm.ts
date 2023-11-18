import { DoctorType, FormDoctorType, HariType } from "../../HospitalTypes";
export const doctorForm: FormDoctorType = {
  name: {
    id: "doctor_00",
    title: "Nama Dokter",
    placeholder: "masukkan name",
    editable: false,
    error: "tidak boleh kosong",
  },
  id: {
    id: "doctor_01",
    title: "ID",
    placeholder: "masukkan id",
    editable: false,
    error: "tidak boleh kosong",
  },
  poliklinik: {
    id: "doctor_02",
    title: "Poliklinik",
    placeholder: "masukkan poliklinik",
    editable: true,
    error: "tidak boleh kosong",
  },
  waktu: {
    id: "doctor_03",
    title: "Waktu Praktek",
    placeholder: "masukkan waktu",
    editable: true,
    error: "tidak boleh kosong",
  },
  hari: {
    id: "doctor_04",
    title: "Hari Praktek",
    placeholder: "masukkan hari",
    editable: true,
    error: "tidak boleh kosong",
  },
  jam: {
    id: "doctor_05",
    title: "Jam Praktek",
    placeholder: "masukkan jam",
    editable: true,
    error: "tidak boleh kosong",
  },
  gender: {
    id: "doctor_06",
    title: "Gender",
    placeholder: "masukkan gender",
    editable: false,
    error: "tidak boleh kosong",
  },
  on_call: {
    id: "doctor_07",
    title: "On Call",
    placeholder: "masukkan on call",
    editable: true,
    error: "tidak boleh kosong",
  },
  telemedicine: {
    id: "doctor_08",
    title: "Menyediakan Telemedicine",
    placeholder: "masukkan telemedicine",
    editable: true,
    error: "tidak boleh kosong",
  },
  biaya_telemedicine: {
    id: "doctor_09",
    title: "Biaya Telemedicine",
    placeholder: "masukkan biaya telemedicine",
    editable: true,
    error: "tidak boleh kosong",
  },
  sedang_online: {
    id: "doctor_10",
    title: "Sedang Online",
    placeholder: "masukkan sedang online",
    editable: true,
    error: "tidak boleh kosong",
  },
  biaya_tatapmuka: {
    id: "doctor_11",
    title: "Biaya Tatap Muka",
    placeholder: "masukkan biaya tatapmuka",
    editable: true,
    error: "tidak boleh kosong",
  },
  kuota: {
    id: "doctor_12",
    title: "Kuota Pasien Per hari",
    placeholder: "masukkan kuota",
    editable: true,
    error: "tidak boleh kosong",
  },
  pengalaman: {
    id: "doctor_13",
    title: "Pengalaman",
    placeholder: "masukkan pengalaman",
    editable: true,
    error: "tidak boleh kosong",
  },
};
export const doctorDetailedForm = (doctorInfo: DoctorType) => {
  const detail = [
    { id: 0, title: "Nama", value: doctorInfo.name },
    { id: 1, title: "Poliklinik", value: doctorInfo.poliklinik.title },
    { id: 2, title: "Pengalaman", value: `${doctorInfo.pengalaman} tahun` },
    {
      id: 3,
      title: "Telemedicine",
      value: doctorInfo.telemedicine ? "Ya" : "Tidak",
    },
    {
      id: 4,
      title: doctorInfo.biaya_telemedicine ? "Biaya Telemedicine" : null,
      value: doctorInfo.biaya_telemedicine
        ? `Rp.${doctorInfo.biaya_telemedicine.toLocaleString()}`
        : null,
    },
    {
      id: 5,
      title: "Biaya Tatap Muka",
      value: `Rp.${doctorInfo.biaya_tatapmuka.toLocaleString()}`,
    },
    {
      id: 6,
      title: "Waktu Praktik",
      value: doctorInfo.waktu,
    },
    {
      id: 7,
      title: "Jam Praktik",
      value: doctorInfo.jam,
    },
    {
      id: 8,
      title: "Hari Praktik",
      value: getPracticeDay(doctorInfo.hari),
    },
    {
      id: 9,
      title: "Kuota tatap muka per hari",
      value: doctorInfo.kuota,
    },
  ];

  return detail.filter((item) => item.title !== null);
};

export const numberToDay = [
  { id: 1, hari: "senin" },
  { id: 2, hari: "selasa" },
  { id: 3, hari: "rabu" },
  { id: 4, hari: "kamis" },
  { id: 5, hari: "jumat" },
  { id: 6, hari: "sabtu" },
  { id: 7, hari: "minggu" },
];

export const getPracticeDay = (days: HariType[]) => {
  let dayArray: string[] = [];
  let lastDay: number = days[0].id_hari;
  let dayStart = "";
  let dayEnd = "";
  let jumpValue: boolean = false;
  days.map((day, index) => {
    const dayName = numberToDay.find((item) => item.id === day.id_hari);

    if (dayName) {
      if (index === 0) {
        dayStart = dayName.hari;
      }
      if (index !== 0 && index === days.length - 1) {
        dayEnd = dayName.hari;
      }
      if (index > 0 && day.id_hari - lastDay > 1) {
        jumpValue = true;
      }
      lastDay = day.id_hari;
      dayArray.push(dayName.hari);
    }
  });

  let practiceDays = "";
  if (jumpValue) {
    practiceDays = printAllDay(dayArray);
  } else {
    if (dayArray.length < 4) {
      practiceDays = printAllDay(dayArray);
    } else {
      practiceDays = dayStart + " s/d " + dayEnd;
    }
  }
  return practiceDays;
};

export const printAllDay = (dayArray: string[]) => {
  let practiceDays = "";
  dayArray.map((itemday, indexday) => {
    if (indexday === dayArray.length - 1) {
      practiceDays = practiceDays + " " + itemday;
    } else {
      practiceDays = practiceDays + " " + itemday + ",";
    }
    return "";
  });
  return practiceDays;
};
