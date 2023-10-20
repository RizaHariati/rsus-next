import { FacilitySanityType } from "@/app/(tools)/types";

import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_DOCTOR = `${NEXT_PUBLIC_BASE_URL}/api/facility/?`;
export async function getFacility(): Promise<FacilitySanityType[]> {
  const res = await fetch(URL_DOCTOR);
  if (res && res.status === 200) {
    const doctors: FacilitySanityType[] = await res.json();
    return doctors;
  }
  return [];
}
