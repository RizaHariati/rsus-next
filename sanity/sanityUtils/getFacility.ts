import { FacilitySanityType } from "@/app/(tools)/HospitalTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_FACILITY = `${NEXT_PUBLIC_BASE_URL}/api/facility/?`;
export async function getFacility(
  code?: string
): Promise<FacilitySanityType[]> {
  const res = code
    ? await fetch(`${URL_FACILITY}id=${code}`)
    : await fetch(URL_FACILITY);
  if (res && res.status === 200) {
    const facility: FacilitySanityType[] = await res.json();

    return facility;
  }
  return [];
}
