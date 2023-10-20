import moment from "moment";
import dataNotification from "@/app/(tools)/data/data_notifications.json";
import {
  NotificationType,
  PatientProfileType,
  ScheduledType,
} from "../patientTypes";

export const getMedicalRecord = (medical_record: string) => {
  if (medical_record.length < 12) return "wrong number format";
  const number1 = medical_record.slice(0, 2);
  const number2 = medical_record.slice(2, 6);
  const number3 = medical_record.slice(6, 10);
  const number4 = medical_record.slice(10, 12);
  return `${number1}-${number2}-${number3}-${number4}`;
};

export const sampleProfile: PatientProfileType = {
  name: "Ratih Purwasih",
  NIK: "051303890004",
  address: "Jl. Letjen Suprapto no.5",
  sex: 0,
  birthdate: "1989-04-23",
  phone: "08121234567890",
  register_date: "2024-08-17",
  password: "password",
  bpjs_number: "0001454326918",
};

export const sampleSchedule: ScheduledType[] = [
  {
    current_phone: "08121234567890",
    schedule_id: "jad-001",
    tujuan: ["dr_003"],
    appointment_type: "tatap_muka",
    scheduled_date: moment().add(3, "d").format("YYYY-MM-DD[T]HH:mm"),
    register_date: moment().add(3, "d").format("YYYY-MM-DD[T]HH:mm"),
    using_bpjs: true,
    nomor_antrian: 12,
  },
  {
    current_phone: "08121234567890",
    schedule_id: "jad-002",
    tujuan: ["dr_005"],
    appointment_type: "telemedicine",
    scheduled_date: moment().add(3, "d").format("YYYY-MM-DD[T]HH:mm"),
    register_date: moment().add(3, "d").format("YYYY-MM-DD[T]HH:mm"),
    using_bpjs: false,
    nomor_antrian: 0,
  },
  {
    current_phone: "08121234567890",
    schedule_id: "jad-003",
    tujuan: ["pak-002", "lab-003", "fas-002"],
    appointment_type: "test",
    scheduled_date: moment().add(3, "d").format("YYYY-MM-DD[T]HH:mm"),
    register_date: moment().subtract(2, "d").format("YYYY-MM-DD[T]HH:mm"),
    using_bpjs: false,
    nomor_antrian: 6,
  },
];

export const sampleNotifications: NotificationType[] = [
  {
    id: "ntf-001",
    notification_code: "ncat-002",
    notification_date: moment()
      .subtract(2, "month")
      .format("YYYY-MM-DD[T]HH:mm"),
    seen: true,
  },
  {
    id: "ntf-002",
    notification_code: "ncat-004",
    title: "Pemotongan Qurban",
    message: [
      "Dalam rangka merayakan Idul Adha, RS Urip Sumoharjo mengadakan pemotongan hewan Qurban",
      "Kegiatan akan dilakukan di Masjid Mustasyfa 28 Juni 2023",
    ],
    notification_date: moment().subtract(2, "w").format("YYYY-MM-DD[T]HH:mm"),
    seen: true,
  },
  {
    id: "ntf-003",
    notification_code: "ncat-003",
    title: "Poli Kecantikan",
    message: [
      "RS Urip Sumoharjo kini menyediakan Poli Kecantikan",
      "Baik pria maupun wanita kini dapat meningkatkan kesehatan dan keremajaan kulit di Poli Kecantikan kami.",
    ],
    notification_date: moment().subtract(4, "d").format("YYYY-MM-DD[T]HH:mm"),
    seen: false,
  },
  {
    id: "ntf-004",
    notification_code: "ncat-003",
    title: "Discount Paket Check Up",
    message: [
      "Ada diskon untuk paket check up tipe Silver dan Gold sebesar 50%",
      `Paket ini berlaku sejak tanggal ${moment()
        .subtract(2, "d")
        .format("DD MMMM")} sampai ${moment()
        .add(2, "w")
        .format("DD MMMM YYYY")} `,
    ],
    notification_date: moment().subtract(2, "d").format("YYYY-MM-DD[T]HH:mm"),
    seen: false,
  },
];
