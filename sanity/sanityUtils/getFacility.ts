import { FacilitySanityType } from "@/app/(tools)/types";

import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_FACILITY = `${NEXT_PUBLIC_BASE_URL}/api/facility/?`;
export async function getFacility(): Promise<FacilitySanityType[]> {
  const res = await fetch(URL_FACILITY);
  if (res && res.status === 200) {
    const doctors: FacilitySanityType[] = await res.json();
    return doctors;
  }
  return [];
}
