import { LabItemType, PaketLabType } from "@/app/(tools)/HospitalTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_LAB_PAKET = `${NEXT_PUBLIC_BASE_URL}/api/paket/`;

export async function getLabPaket(code?: string) {
  const res = code
    ? await fetch(`${URL_LAB_PAKET}id=${code}`)
    : await fetch(URL_LAB_PAKET);

  if (res && res.status === 200) {
    const labPaket: PaketLabType[] = await res.json();

    return labPaket;
  }
  return [];
}
