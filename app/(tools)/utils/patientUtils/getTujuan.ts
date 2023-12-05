import {
  DoctorType,
  FacilitySanityType,
  LabItemType,
  PaketLabType,
} from "../../HospitalTypes";
import { toast } from "react-toastify";

export const getTujuan = (
  code: string,
  dataFacility: FacilitySanityType[],
  dataPaket: PaketLabType[],
  dataLabSatuan: LabItemType[],
  dataDoctor: DoctorType[]
) => {
  if (!dataFacility || !dataPaket || !dataDoctor || !dataLabSatuan) return;

  const codeTujuan = code.slice(0, 3);

  if (codeTujuan === "fas") {
    const res: FacilitySanityType | undefined = dataFacility.find(
      (item) => item.id === code
    );
    if (!res) return toast.error("data Fasilitas tidak ditemukan");
    else {
      return res;
    }
  } else if (codeTujuan === "dr_") {
    const res: DoctorType | undefined = dataDoctor.find(
      (item) => item.id === code
    );
    if (!res) return toast.error("data Dokter tidak ditemukan");
    else {
      return res;
    }
  } else if (codeTujuan === "pak") {
    const res: PaketLabType | undefined = dataPaket.find(
      (item) => item.id === code
    );
    if (!res) return toast.error("data Paket tidak ditemukan");
    else {
      return res;
    }
  } else {
    const res: LabItemType | undefined = dataLabSatuan.find(
      (item) => item.id === code
    );
    if (!res) return toast.error("data Laboratorium tidak ditemukan");
    else {
      return res;
    }
  }
};
