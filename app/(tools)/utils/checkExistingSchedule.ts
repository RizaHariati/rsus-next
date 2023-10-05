import dayjs from "dayjs";
import { ScheduledType } from "../patientTypes";
import { DoctorType } from "../types";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";

export const checkExistingDoctor = (
  doctorInfo: DoctorType,
  schedule: ScheduledType[]
) => {
  const findDoctorInSchedule = schedule.find(
    (item) => item.tujuan[0] === doctorInfo.id
  );
  const findPoliInSchedule = schedule
    .map((item) => {
      const findDoctor = dataDoctor.find(
        (itemDoctor) => itemDoctor.id === item.tujuan[0]
      );
      return findDoctor?.poliklinik.title;
    })
    .find((item) => item === doctorInfo.poliklinik.title);

  if (findDoctorInSchedule) {
    return {
      passChecking: false,
      message: `Anda sudah terjadwal dengan ${doctorInfo.name}`,
    };
  }
  if (findPoliInSchedule) {
    return {
      passChecking: false,
      message: `Anda sudah terjadwal di ${doctorInfo.poliklinik.title}`,
    };
  }
  return {
    passChecking: true,
    message: `Konsultasi dengan ${doctorInfo.name} berhasil dijadwalkan`,
  };
};
export const checkExistingSchedule = (
  selected_date: Date,
  schedule: ScheduledType[],
  doctorInfo?: DoctorType
) => {
  const findDateInSchedule = schedule.filter((item) => {
    return (
      dayjs(item.scheduled_date).format("DD-MM-YYYY") ===
      dayjs(selected_date).format("DD-MM-YYYY")
    );
  });

  if (findDateInSchedule.length > 0) {
    if (!doctorInfo) {
      return {
        passChecking: false,
        message: `Di tanggal ini anda sudah ada jadwal ditempat lain, silahkan pilih jadwal yang kosong`,
      };
    } else {
      if (findDateInSchedule.length >= 2) {
        return {
          passChecking: false,
          message: `Maksimal jadwal perhari adalah 2 poliklinik`,
        };
      } else {
        const findDoctor = dataDoctor.find(
          (item) => item.id === findDateInSchedule[0].tujuan[0]
        );
        if (findDoctor) {
          if (doctorInfo.waktu === findDoctor.waktu) {
            return {
              passChecking: false,
              message: `Anda sudah punya jadwal ditanggal ${dayjs(
                selected_date
              ).format("DD-MM-YYYY)")} ${doctorInfo.waktu}`,
            };
          }
        }
      }
    }
  }

  return {
    passChecking: true,
    message: `Pilihan Anda berhasil dijadwalkan`,
  };
};
