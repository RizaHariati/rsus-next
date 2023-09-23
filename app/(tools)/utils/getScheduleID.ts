import { ScheduledType } from "../patientTypes";
import { addZeroString } from "./addZeroString";

export const getScheduleID = (scheduleList: ScheduledType[]) => {
  let newScheduleID = "jad-001";
  if (scheduleList.length > 0) {
    newScheduleID = addZeroString(
      scheduleList[scheduleList.length - 1].schedule_id
    );
  }
  return newScheduleID;
};
