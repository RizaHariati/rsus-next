import { NEXT_PUBLIC_BASE_URL } from "../env";
import { DoctorType } from "@/app/(tools)/types";
const URL_DOCTOR = `${NEXT_PUBLIC_BASE_URL}/api/doctor/?`;

export const getDoctors: (code?: string) => Promise<DoctorType[]> = async (
  code?: string
) => {
  const res = code
    ? await fetch(`${URL_DOCTOR}id=${code}`)
    : await fetch(URL_DOCTOR);
  if (res && res.status === 200) {
    const doctors: DoctorType[] = await res.json();
    return doctors;
  }
  return [];
};
