import { LabItemType } from "@/app/(tools)/HospitalTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_LAB_SATUAN = `${NEXT_PUBLIC_BASE_URL}/api/laboratorium/`;

export async function getLabSatuan(code?: string) {
  const res = code
    ? await fetch(`${URL_LAB_SATUAN}id=${code}`)
    : await fetch(URL_LAB_SATUAN);

  if (res && res.status === 200) {
    const labSatuan: LabItemType[] = await res.json();

    return labSatuan;
  }
  return [];
}
