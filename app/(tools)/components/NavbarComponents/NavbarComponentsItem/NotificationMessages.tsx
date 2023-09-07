import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  NotificationLibraryType,
  NotificationType,
  ScheduledType,
} from "@/app/(tools)/patientTypes";
import React from "react";
import { PatientProfileType } from "../../../patientTypes";
import dayjs from "dayjs";
import dataDoctor from "@/app/(tools)/data/data_dokter.json";
import dataLabSatuan from "@/app/(tools)/data/data_lab_satuan.json";
import dataPaketKesehatan from "@/app/(tools)/data/data_paketkesehatan.json";
import dataFacility from "@/app/(tools)/data/data_facility.json";

type Props = {
  messages: string[];
  findNotif: NotificationLibraryType;
  notificationItem: NotificationType;
};

const NotificationMessages = ({
  messages,
  findNotif,
  notificationItem,
}: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  const patientprofile: PatientProfileType = patient.patient_profile;
  const patientSchedules: ScheduledType[] = patient.scheduled_appointments;

  const getActivities = () => {
    const schedule = patientSchedules.find(
      (scheduleItem) =>
        scheduleItem.schedule_id === notificationItem.schedule_code || ""
    );
    let doctorActivities = { poli: "", name: "" };
    let testActivities: string[] = [];
    if (schedule) {
      schedule.tujuan.map((code) => {
        const findDoctor = dataDoctor.find((item) => item.id === code);
        const findLab = dataLabSatuan.find((item) => item.id === code);
        const findPaket = dataPaketKesehatan.find((item) => item.id === code);
        const findFas = dataFacility.find((item) => item.id === code);

        if (findDoctor) {
          doctorActivities = {
            poli: findDoctor.poliklinik.title,
            name: findDoctor.nama,
          };
        } else {
          testActivities.push(
            findLab?.title || findPaket?.title || findFas?.title || ""
          );
        }
        return "";
      });
    }
    return { doctorActivities, testActivities };
  };

  if (findNotif.category === "admin") {
    return (
      <div className="inline body-3 leading-4">
        {`${messages[0]} ${patientprofile.name}.
        ${messages[1]}
        ${dayjs(notificationItem?.date).format("DD-MM-YYYY") || ""}.`}
      </div>
    );
  } else {
    if (findNotif.type === "success") {
      return (
        <div className="inline body-3 leading-4">
          {`${messages[0]} ${
            getActivities().testActivities.length > 0
              ? getActivities().testActivities.join(", ")
              : `${getActivities().doctorActivities.name}-poli ${
                  getActivities().doctorActivities.poli
                }`
          }.
        ${messages[1]}  ${
            dayjs(notificationItem?.date).format("DD-MM-YYYY") || ""
          }.   ${messages[2] || ""}`}
        </div>
      );
    } else {
      return (
        <div className="inline body-3 leading-4">
          {`${messages[0]} ${
            getActivities().testActivities.length > 0
              ? getActivities().testActivities.join(", ")
              : `${getActivities().doctorActivities.name}-poli ${
                  getActivities().doctorActivities.poli
                }`
          }.
        ${messages[1]}  ${messages[2] || ""}`}
        </div>
      );
    }
  }
};

export default NotificationMessages;
